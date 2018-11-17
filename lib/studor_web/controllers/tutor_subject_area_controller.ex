defmodule StudorWeb.TutorSubjectAreaController do
  use StudorWeb, :controller

  alias Studor.TutorSubjectAreas
  alias Studor.TutorSubjectAreas.TutorSubjectArea

  action_fallback StudorWeb.FallbackController

  def index(conn, _params) do
    tutor_subject_areas = TutorSubjectAreas.list_tutor_subject_areas()
    render(conn, "index.json", tutor_subject_areas: tutor_subject_areas)
  end

  def create(conn, %{"tutor_subject_area" => tutor_subject_area_params}) do
    with {:ok, %TutorSubjectArea{} = tutor_subject_area} <- TutorSubjectAreas.create_tutor_subject_area(tutor_subject_area_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.tutor_subject_area_path(conn, :show, tutor_subject_area))
      |> render("show.json", tutor_subject_area: tutor_subject_area)
    end
  end

  def show(conn, %{"id" => id}) do
    tutor_subject_area = TutorSubjectAreas.get_tutor_subject_area!(id)
    render(conn, "show.json", tutor_subject_area: tutor_subject_area)
  end

  def update(conn, %{"id" => id, "tutor_subject_area" => tutor_subject_area_params}) do
    tutor_subject_area = TutorSubjectAreas.get_tutor_subject_area!(id)

    with {:ok, %TutorSubjectArea{} = tutor_subject_area} <- TutorSubjectAreas.update_tutor_subject_area(tutor_subject_area, tutor_subject_area_params) do
      render(conn, "show.json", tutor_subject_area: tutor_subject_area)
    end
  end

  def delete(conn, %{"id" => id}) do
    tutor_subject_area = TutorSubjectAreas.get_tutor_subject_area!(id)

    with {:ok, %TutorSubjectArea{}} <- TutorSubjectAreas.delete_tutor_subject_area(tutor_subject_area) do
      send_resp(conn, :no_content, "")
    end
  end
end
