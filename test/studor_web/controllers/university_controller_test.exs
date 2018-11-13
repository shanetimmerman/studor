defmodule StudorWeb.UniversityControllerTest do
  use StudorWeb.ConnCase

  alias Studor.Universities
  alias Studor.Universities.University

  @create_attrs %{
    name: "some name"
  }
  @update_attrs %{
    name: "some updated name"
  }
  @invalid_attrs %{name: nil}

  def fixture(:university) do
    {:ok, university} = Universities.create_university(@create_attrs)
    university
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all universities", %{conn: conn} do
      conn = get(conn, Routes.university_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create university" do
    test "renders university when data is valid", %{conn: conn} do
      conn = post(conn, Routes.university_path(conn, :create), university: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.university_path(conn, :show, id))

      assert %{
               "id" => id,
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.university_path(conn, :create), university: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update university" do
    setup [:create_university]

    test "renders university when data is valid", %{conn: conn, university: %University{id: id} = university} do
      conn = put(conn, Routes.university_path(conn, :update, university), university: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.university_path(conn, :show, id))

      assert %{
               "id" => id,
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, university: university} do
      conn = put(conn, Routes.university_path(conn, :update, university), university: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete university" do
    setup [:create_university]

    test "deletes chosen university", %{conn: conn, university: university} do
      conn = delete(conn, Routes.university_path(conn, :delete, university))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.university_path(conn, :show, university))
      end
    end
  end

  defp create_university(_) do
    university = fixture(:university)
    {:ok, university: university}
  end
end
