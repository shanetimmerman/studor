defmodule StudorWeb.TutorController do
  use StudorWeb, :controller

  alias Studor.Tutors
  alias Studor.Tutors.Tutor

  action_fallback StudorWeb.FallbackController

  def index(conn, _params) do
    tutors = Tutors.list_tutors()
    render(conn, "index.json", tutors: tutors)
  end



  # Fetches a list of tutors that go to the given university and teach courses that match the given query
  def course_index(conn, %{ "university_id" => university_id, "query" => query}) do
    tutors = Tutors.search_courses(university_id, query)

    render(conn, "index.json", tutors: tutors)
  end

  # Fetches a list of tutors that are marked with the given subject area
  def subject_index(conn, %{ "subject_area_id" => subject_area_id}) do
    tutors = Tutors.search_subjects(subject_area_id)
    render(conn, "index.json", tutors: tutors)
  end


  def create(conn, %{"tutor" => tutor_params}) do
    with {:ok, %Tutor{} = tutor} <- Tutors.create_tutor(tutor_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.tutor_path(conn, :show, tutor))
      |> render("show.json", tutor: tutor)
    end
  end

  def show(conn, %{"id" => id}) do
    tutor = Tutors.get_tutor!(id)
    render(conn, "show.json", tutor: tutor)
  end


  def update(conn, %{"id" => id, "tutor" => tutor_params}) do
    tutor = Tutors.get_tutor!(id)

    with {:ok, %Tutor{} = tutor} <- Tutors.update_tutor(tutor, tutor_params) do
      render(conn, "show.json", tutor: tutor)
    end
  end

  def delete(conn, %{"id" => id}) do
    tutor = Tutors.get_tutor!(id)

    with {:ok, %Tutor{}} <- Tutors.delete_tutor(tutor) do
      send_resp(conn, :no_content, "")
    end
  end
end
