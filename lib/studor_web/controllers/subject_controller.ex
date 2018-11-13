defmodule StudorWeb.SubjectController do
  use StudorWeb, :controller

  alias Studor.Subjects
  alias Studor.Subjects.Subject

  action_fallback StudorWeb.FallbackController

  def index(conn, _params) do
    subjects = Subjects.list_subjects()
    render(conn, "index.json", subjects: subjects)
  end

  def create(conn, %{"subject" => subject_params}) do
    with {:ok, %Subject{} = subject} <- Subjects.create_subject(subject_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.subject_path(conn, :show, subject))
      |> render("show.json", subject: subject)
    end
  end

  def show(conn, %{"id" => id}) do
    subject = Subjects.get_subject!(id)
    render(conn, "show.json", subject: subject)
  end

  def update(conn, %{"id" => id, "subject" => subject_params}) do
    subject = Subjects.get_subject!(id)

    with {:ok, %Subject{} = subject} <- Subjects.update_subject(subject, subject_params) do
      render(conn, "show.json", subject: subject)
    end
  end

  def delete(conn, %{"id" => id}) do
    subject = Subjects.get_subject!(id)

    with {:ok, %Subject{}} <- Subjects.delete_subject(subject) do
      send_resp(conn, :no_content, "")
    end
  end
end
