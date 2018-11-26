defmodule StudorWeb.TutoringSessionController do
  use StudorWeb, :controller

  require Paypal

  alias Studor.TutoringSessions
  alias Studor.TutoringSessions.TutoringSession

  alias Studor.Students
  alias Studor.TimeBlocks


  action_fallback StudorWeb.FallbackController

  def index(conn, %{"user_id" => user_id, "user_type" => user_type}) do
    if user_type == "STUDENT" do
      tutoring_sessions = TutoringSessions.list_tutoring_sessions_by_student_id(user_id)
      render(conn, "index.json", tutoring_sessions: tutoring_sessions)
    else
      tutoring_sessions = TutoringSessions.list_tutoring_sessions_by_tutor_id(user_id)
      render(conn, "index.json", tutoring_sessions: tutoring_sessions)
    end
  end

  def create(conn, %{"paid_tutoring_session" => tutoring_session_params}) do
    IO.inspect tutoring_session_params
    with {:ok, %TutoringSession{} = tutoring_session} <- TutoringSessions.create_tutoring_session(tutoring_session_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.tutoring_session_path(conn, :show, tutoring_session))
      |> render("show.json", tutoring_session: tutoring_session)
    end
  end

  def create(conn, %{"tutoring_session" => tutoring_session_params}) do
    token = Paypal.get_token()
    tutor = Students.get_student!(tutoring_session_params["tutor_id"])
    tutor_paypal_email = "shanetimmerman-facilitator@gmail.com"
    time_block = TimeBlocks.get_time_block!(tutoring_session_params["time_block_id"])
    price = Time.diff(time_block.end_time, time_block.start_time, :second) / 180
    confirm_url = "http://localhost:4000/from_paypal?#{URI.encode_query(tutoring_session_params)}"
    cancel_url = "http://localhost:4000"
    with {:ok, resp} = Paypal.pay(token["access_token"], tutor_paypal_email, price, confirm_url, cancel_url) do
      path = Enum.find(resp["links"], fn(element) ->
        match?(%{"method" => "REDIRECT"}, element) end)["href"]
      IO.inspect(path, label: "you got down to the path")
      conn
      |> put_status(:created)
      |> json(%{redirect_to: path})
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
