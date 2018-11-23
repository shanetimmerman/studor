defmodule StudorWeb.SessionFileController do
  use StudorWeb, :controller

  alias Studor.SessionFiles
  alias Studor.SessionFiles.SessionFile

  action_fallback StudorWeb.FallbackController

  def index(conn, _params) do
    session_files = SessionFiles.list_session_files()
    render(conn, "index.json", session_files: session_files)
  end

  def create(conn, %{"session_file" => session_file_params}) do
    with {:ok, %SessionFile{} = session_file} <- SessionFiles.create_session_file(session_file_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.session_file_path(conn, :show, session_file))
      |> render("show.json", session_file: session_file)
    end
  end

  def post_files(conn, %{"files" => files}) do
    IO.inspect files
  end

  def show(conn, %{"id" => id}) do
    session_file = SessionFiles.get_session_file!(id)
    render(conn, "show.json", session_file: session_file)
  end

  def update(conn, %{"id" => id, "session_file" => session_file_params}) do
    session_file = SessionFiles.get_session_file!(id)

    with {:ok, %SessionFile{} = session_file} <- SessionFiles.update_session_file(session_file, session_file_params) do
      render(conn, "show.json", session_file: session_file)
    end
  end

  def delete(conn, %{"id" => id}) do
    session_file = SessionFiles.get_session_file!(id)

    with {:ok, %SessionFile{}} <- SessionFiles.delete_session_file(session_file) do
      send_resp(conn, :no_content, "")
    end
  end
end
