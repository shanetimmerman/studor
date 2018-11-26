defmodule StudorWeb.RedirectController do
    use StudorWeb, :controller

    alias Studor.TutoringSessions

    def index(conn, tutoring_session_params) do
        tutoring_session_params = Map.put(tutoring_session_params, "payment_id", tutoring_session_params["paymentId"])

        IO.inspect tutoring_session_params, label: "WTF"

        TutoringSessions.create_tutoring_session(tutoring_session_params)

        conn
        |> redirect(to: "/")
    end
end
