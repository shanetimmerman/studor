defmodule StudorWeb.RedirectController do
    use StudorWeb, :controller

    alias Studor.TutoringSessions
    alias Studor.PaymentServer
    alias Studor.TimeBlocks

    require DateTime
    require Kernel

    def index(conn, tutoring_session_params) do
        tutoring_session_params = Map.put(tutoring_session_params, "payment_id", tutoring_session_params["paymentId"])
        |> Map.put("payer_id", tutoring_session_params["PayerID"])

        TutoringSessions.create_tutoring_session(tutoring_session_params)

        end_time = TimeBlocks.get_time_block!(tutoring_session_params["time_block_id"]).end_time

        wait_time = Kernel.max(DateTime.diff(end_time, DateTime.utc_now()), 1)
        PaymentServer.execute_payment(
            tutoring_session_params["payment_id"],
            tutoring_session_params["payer_id"],
            wait_time
        )

        conn
        |> redirect(to: "/")
    end
end
