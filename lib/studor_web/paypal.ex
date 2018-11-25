defmodule Paypal do
    require HTTPoison
    require Jason

    def get_token() do
        HTTPoison.start

        url = <<"https://api.sandbox.paypal.com/v1/oauth2/token">>
        api_user = "Ad9n9s7seoBirJwOod2lM91dPD077QedgscyggyWPqY7JxY01_vTtF67ZlrjiQwlZ7QNxKdYo5HAEias"
        api_password = "EIMiv4tz9pkVBitXdLgzN5KRtgfaaNhfzG7blKLE3sV-d2cPcwD5O5QsrYMJtQzDgTaDkChhQqeEXNTC"
        api_credentials = api_user <> ":" <> api_password
        headers = [
            {"Accept", "application/json"},
            {"Accept-Language", "en_US"},
            # {"Authorization", "Basic #{Base.encode64(api_credentials)}"},
        ]
        # TODO user not authenicated properly (something about -u option of curl
        # and how Poison handles it)
        options = [
            hackney: [basic_auth: {api_user, api_password}],
            grant_type: "client_credentials"
        ]

        {:ok, resp} = HTTPoison.get(url, headers, options)

        Jason.decode!(resp.body)
    end

    def pay(api_token, payer_email, reciever_email) do
        HTTPoison.start
        url = "https://api.sandbox.paypal.com/v1/payments/payment"
        headers = [
            {"Content-Type", "application/json"},
            {"Authorization", "Bearer #{api_token}"}
        ]
        body = Jason.encode!(%{
            intent: "sale",
            payer: %{
                payment_method: "paypal",
                payer_info: %{
                    email: payer_email,
                }
            },

            application_context: %{
                brand_name: "Stutor",
                shipping_preference: "NO_SHIPPING",
                user_action: "commit",
            },

            transactions: [
                %{
                    description: "A tutoring session.",
                    soft_descriptor: "ECHI5786786",

                    amount: %{
                        total: "30.11",
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
                return_url: "http://localhost:4000",
                cancel_url: "http://localhost:4000",
            },
        })

        {tag, resp} = HTTPoison.post(url, body, headers, [])
        # TODO RETURN SALE ID or ERROR, handle in session controller
        Jason.decode!(resp.body)
    end


    def refund(sale_id, access_token) do
        url = "https://api.sandbox.paypal.com/v1/payments/sale/#{sale_id}/refund"

        headers = [
            {"Content-Type", "application/json"},
            {"Authorization", "Bearer #{access_token}"},
        ]

        body = []

        {:ok, resp} = HTTPoison.post(url, body, headers, [])

        # TODO improve return type
        Jason.decode!(resp.body)

    end

end
