defmodule StudorWeb.RedirectController do
    use StudorWeb, :controller

    alias Studor.TutoringSessions

    def index(conn, tutoring_session_params) do
        TutoringSessions.create_tutoring_session(tutoring_session_params)
        conn
        |> redirect(to: "/")
    end
end
