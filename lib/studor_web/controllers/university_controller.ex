defmodule StudorWeb.UniversityController do
  use StudorWeb, :controller

  alias Studor.Universities
  alias Studor.Universities.University

  action_fallback StudorWeb.FallbackController

  def index(conn, _params) do
    IO.puts "fetching"
    universities = Universities.list_universities()
    IO.inspect universities

    render(conn, "index.json", universities: universities)
  end

  def create(conn, %{"university" => university_params}) do
    with {:ok, %University{} = university} <- Universities.create_university(university_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.university_path(conn, :show, university))
      |> render("show.json", university: university)
    end
  end

  def show(conn, %{"id" => id}) do
    university = Universities.get_university!(id)
    render(conn, "show.json", university: university)
  end

  def update(conn, %{"id" => id, "university" => university_params}) do
    university = Universities.get_university!(id)

    with {:ok, %University{} = university} <- Universities.update_university(university, university_params) do
      render(conn, "show.json", university: university)
    end
  end

  def delete(conn, %{"id" => id}) do
    university = Universities.get_university!(id)

    with {:ok, %University{}} <- Universities.delete_university(university) do
      send_resp(conn, :no_content, "")
    end
  end
end
