defmodule StudorWeb.SubjectAreaController do
  use StudorWeb, :controller

  alias Studor.SubjectAreas
  alias Studor.SubjectAreas.SubjectArea

  action_fallback StudorWeb.FallbackController

  def index(conn, _params) do
    subject_areas = SubjectAreas.list_subject_areas()
    render(conn, "index.json", subject_areas: subject_areas)
  end

  def create(conn, %{"subject_area" => subject_area_params}) do
    with {:ok, %SubjectArea{} = subject_area} <- SubjectAreas.create_subject_area(subject_area_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.subject_area_path(conn, :show, subject_area))
      |> render("show.json", subject_area: subject_area)
    end
  end

  def show(conn, %{"id" => id}) do
    subject_area = SubjectAreas.get_subject_area!(id)
    render(conn, "show.json", subject_area: subject_area)
  end

  def update(conn, %{"id" => id, "subject_area" => subject_area_params}) do
    subject_area = SubjectAreas.get_subject_area!(id)

    with {:ok, %SubjectArea{} = subject_area} <- SubjectAreas.update_subject_area(subject_area, subject_area_params) do
      render(conn, "show.json", subject_area: subject_area)
    end
  end

  def delete(conn, %{"id" => id}) do
    subject_area = SubjectAreas.get_subject_area!(id)

    with {:ok, %SubjectArea{}} <- SubjectAreas.delete_subject_area(subject_area) do
      send_resp(conn, :no_content, "")
    end
  end
end
