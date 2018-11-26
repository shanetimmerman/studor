defmodule Studor.PaymentServer do
    use GenServer

    require Paypal

    def init(args) do
        {:ok, args}
    end

    def execute_payment(payment_id, payer_id, time) do
        Process.send_after(self(), {:execute, payment_id, payer_id}, time)
    end

    def handle_info({:execute, payment_id, payer_id}, state) do
        token = Paypal.get_token()
        access_token = token["access_token"]

        Paypal.execute_payment(access_token, payment_id, payer_id)

        {:noreply, state}
    end
end
