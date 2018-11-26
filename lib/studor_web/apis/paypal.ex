defmodule Paypal do
    require HTTPoison
    require Jason

    def get_token() do

        HTTPoison.start

        url = "https://api.sandbox.paypal.com/v1/oauth2/token"

        api_user = "Ad9n9s7seoBirJwOod2lM91dPD077QedgscyggyWPqY7JxY01_vTtF67ZlrjiQwlZ7QNxKdYo5HAEias"
        api_password = "EIMiv4tz9pkVBitXdLgzN5KRtgfaaNhfzG7blKLE3sV-d2cPcwD5O5QsrYMJtQzDgTaDkChhQqeEXNTC"


        headers = [
            {"Accept", "application/json"},
            {"Accept-Language", "en_US"},
            {"Content-Type", "application/x-www-form-urlencoded"},
        ]

        data = "grant_type=client_credentials"

        options = [
            hackney: [
                basic_auth: {api_user, api_password},
            ]
        ]

        {:ok, resp} = HTTPoison.post(url, data, headers, options)

        # Token in format of:
        # %{
        #     "access_token" => ...,
        #     "app_id" => ...,
        #     "expires_in" => 32333,
        #     "nonce" => ...,
        #     "scope" => ...,
        #     "token_type" => "Bearer"
        # }
        Jason.decode!(resp.body)
    end

    def pay(api_token, reciever_email, amount, confirm_url, cancel_url) do
        HTTPoison.start
        url = "https://api.sandbox.paypal.com/v1/payments/payment"
        headers = [
            {"Authorization", "Bearer #{api_token}"},
            {"Content-Type", "application/json"},
        ]
        body = Jason.encode!(%{
            intent: "authorize",
            payer: %{
                payment_method: "paypal",
            },

            application_context: %{
                brand_name: "Stutor",
                shipping_preference: "NO_SHIPPING",
                user_action: "commit",
            },

            transactions: [
                %{
                    description: "A tutoring session.",

                    amount: %{
                        total: amount,
                        currency: "USD",
                    },

                    payee: %{
                        email: reciever_email,
                    },

                    payment_options: %{
                        allowed_payment_method: "INSTANT_FUNDING_SOURCE"
                    },
                },
            ],

            redirect_urls: %{
                return_url: confirm_url,
                cancel_url: cancel_url,
            },
        })

        {:ok, resp} = HTTPoison.post(url, body, headers)

        case body = Jason.decode!(resp.body) do
            %{"id" => _payment_id} -> {:ok, body}
            _ -> {400, body} # Could be debug or error
        end
    end

    def update_price(access_token, payment_id, price) do
        url = "https://api.sandbox.paypal.com/v1/payments/payment/#{payment_id}"

        headers = [
            {"Content-Type", "application/json"},
            {"Authorization", "Bearer #{access_token}"}
        ]

        body = Jason.encode!([
            %{
                op: "replace",
                path: "/transactions/0/amount",
                value: %{
                    total: price,
                    currency: "USD",
                }
            }
        ])

        {:ok, resp} = HTTPoison.patch(url, body, headers)

        case body = Jason.decode!(resp.body) do
            %{"id" => _payment_id} -> {:ok, body}
            _ -> {400, body} # Could be debug or error
        end

    end

    def refund(access_token, payment_id, payer_id) do
        url = "https://api.sandbox.paypal.com/v1/payments/payment/#{payment_id}/refund"

        headers = [
            {"Content-Type", "application/json"},
            {"Authorization", "Bearer #{access_token}"},
        ]

        body = %{
            payer_id: payer_id
        }

        {:ok, resp} = HTTPoison.post(url, Jason.encode!(body), headers, [])

        # TODO improve return type
        Jason.decode!(resp.body)

    end

    def execute_payment(access_token, payment_id, payer_id) do
        url = "https://api.sandbox.paypal.com/v1/payments/payment/#{payment_id}/execute"

        headers = [
            {"Content-Type", "application/json"},
            {"Authorization", "Bearer #{access_token}"}
        ]

        body = %{
            payer_id: payer_id
        }

        HTTPoison.post(url, Jason.encode!(body), headers)

    end
end
