defmodule StudorWeb.TutoringSessionController do
  use StudorWeb, :controller

  alias Studor.TutoringSessions
  alias Studor.TutoringSessions.TutoringSession

  action_fallback StudorWeb.FallbackController

  def index(conn, %{"user_id" => user_id}) do
    tutoring_sessions = TutoringSessions.list_tutoring_sessions_by_id(user_id)
    render(conn, "index.json", tutoring_sessions: tutoring_sessions)
  end

  def create(conn, %{"tutoring_session" => tutoring_session_params}) do
    IO.inspect tutoring_session_params
    with {:ok, %TutoringSession{} = tutoring_session} <- TutoringSessions.create_tutoring_session(tutoring_session_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.tutoring_session_path(conn, :show, tutoring_session))
      |> render("show.json", tutoring_session: tutoring_session)
    end
  end

  def show(conn, %{"id" => id}) do
    tutoring_session = TutoringSessions.get_tutoring_session!(id)
    render(conn, "show.json", tutoring_session: tutoring_session)
  end

  def update(conn, %{"id" => id, "tutoring_session" => tutoring_session_params}) do
    tutoring_session = TutoringSessions.get_tutoring_session!(id)

    with {:ok, %TutoringSession{} = tutoring_session} <- TutoringSessions.update_tutoring_session(tutoring_session, tutoring_session_params) do
      render(conn, "show.json", tutoring_session: tutoring_session)
    end
  end

  def delete(conn, %{"id" => id}) do
    tutoring_session = TutoringSessions.get_tutoring_session!(id)

    with {:ok, %TutoringSession{}} <- TutoringSessions.delete_tutoring_session(tutoring_session) do
      send_resp(conn, :no_content, "")
    end
  end
end
