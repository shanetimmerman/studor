defmodule StudorWeb.TutorCourseController do
  use StudorWeb, :controller

  alias Studor.TutorCourses
  alias Studor.TutorCourses.TutorCourse

  action_fallback StudorWeb.FallbackController

  def index(conn, _params) do
    tutor_courses = TutorCourses.list_tutor_courses()
    render(conn, "index.json", tutor_courses: tutor_courses)
  end

  def create(conn, %{"tutor_course" => tutor_course_params}) do
    with {:ok, %TutorCourse{} = tutor_course} <- TutorCourses.create_tutor_course(tutor_course_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.tutor_course_path(conn, :show, tutor_course))
      |> render("show.json", tutor_course: tutor_course)
    end
  end

  def show(conn, %{"id" => id}) do
    tutor_course = TutorCourses.get_tutor_course!(id)
    render(conn, "show.json", tutor_course: tutor_course)
  end

  def update(conn, %{"id" => id, "tutor_course" => tutor_course_params}) do
    tutor_course = TutorCourses.get_tutor_course!(id)

    with {:ok, %TutorCourse{} = tutor_course} <- TutorCourses.update_tutor_course(tutor_course, tutor_course_params) do
      render(conn, "show.json", tutor_course: tutor_course)
    end
  end

  def delete(conn, %{"id" => id}) do
    tutor_course = TutorCourses.get_tutor_course!(id)

    with {:ok, %TutorCourse{}} <- TutorCourses.delete_tutor_course(tutor_course) do
      send_resp(conn, :no_content, "")
    end
  end
end
