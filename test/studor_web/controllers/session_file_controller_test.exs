defmodule StudorWeb.SessionFileControllerTest do
  use StudorWeb.ConnCase

  alias Studor.SessionFiles
  alias Studor.SessionFiles.SessionFile

  @create_attrs %{
    file_url: "some file_url"
  }
  @update_attrs %{
    file_url: "some updated file_url"
  }
  @invalid_attrs %{file_url: nil}

  def fixture(:session_file) do
    {:ok, session_file} = SessionFiles.create_session_file(@create_attrs)
    session_file
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all session_files", %{conn: conn} do
      conn = get(conn, Routes.session_file_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create session_file" do
    test "renders session_file when data is valid", %{conn: conn} do
      conn = post(conn, Routes.session_file_path(conn, :create), session_file: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.session_file_path(conn, :show, id))

      assert %{
               "id" => id,
               "file_url" => "some file_url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.session_file_path(conn, :create), session_file: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update session_file" do
    setup [:create_session_file]

    test "renders session_file when data is valid", %{conn: conn, session_file: %SessionFile{id: id} = session_file} do
      conn = put(conn, Routes.session_file_path(conn, :update, session_file), session_file: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.session_file_path(conn, :show, id))

      assert %{
               "id" => id,
               "file_url" => "some updated file_url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, session_file: session_file} do
      conn = put(conn, Routes.session_file_path(conn, :update, session_file), session_file: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete session_file" do
    setup [:create_session_file]

    test "deletes chosen session_file", %{conn: conn, session_file: session_file} do
      conn = delete(conn, Routes.session_file_path(conn, :delete, session_file))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.session_file_path(conn, :show, session_file))
      end
    end
  end

  defp create_session_file(_) do
    session_file = fixture(:session_file)
    {:ok, session_file: session_file}
  end
end
