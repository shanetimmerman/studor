defmodule Studor.PaymentServer do
    use GenServer

    require Paypal
    require HTTPoison
    require Jason
    require Logger

    def execute_payment(url, time) do
        Process.send_after(self(), {:execute, url}, time)
    end

    def handle_info({:execute, url}, state) do
        resp = HTTPoison.post(url, Jason.encode!([]))
        Logger.info "Posting system: #{inspect(resp)}"
        {:noreply, state}

    end
end
