defmodule StudorWeb.SubjectAreaControllerTest do
  use StudorWeb.ConnCase

  alias Studor.SubjectAreas
  alias Studor.SubjectAreas.SubjectArea

  @create_attrs %{
    subject_area: "some subject_area"
  }
  @update_attrs %{
    subject_area: "some updated subject_area"
  }
  @invalid_attrs %{subject_area: nil}

  def fixture(:subject_area) do
    {:ok, subject_area} = SubjectAreas.create_subject_area(@create_attrs)
    subject_area
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all subject_areas", %{conn: conn} do
      conn = get(conn, Routes.subject_area_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create subject_area" do
    test "renders subject_area when data is valid", %{conn: conn} do
      conn = post(conn, Routes.subject_area_path(conn, :create), subject_area: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.subject_area_path(conn, :show, id))

      assert %{
               "id" => id,
               "subject_area" => "some subject_area"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.subject_area_path(conn, :create), subject_area: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update subject_area" do
    setup [:create_subject_area]

    test "renders subject_area when data is valid", %{conn: conn, subject_area: %SubjectArea{id: id} = subject_area} do
      conn = put(conn, Routes.subject_area_path(conn, :update, subject_area), subject_area: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.subject_area_path(conn, :show, id))

      assert %{
               "id" => id,
               "subject_area" => "some updated subject_area"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, subject_area: subject_area} do
      conn = put(conn, Routes.subject_area_path(conn, :update, subject_area), subject_area: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete subject_area" do
    setup [:create_subject_area]

    test "deletes chosen subject_area", %{conn: conn, subject_area: subject_area} do
      conn = delete(conn, Routes.subject_area_path(conn, :delete, subject_area))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.subject_area_path(conn, :show, subject_area))
      end
    end
  end

  defp create_subject_area(_) do
    subject_area = fixture(:subject_area)
    {:ok, subject_area: subject_area}
  end
end
