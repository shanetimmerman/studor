defmodule StudorWeb.TutorSubjectAreaControllerTest do
  use StudorWeb.ConnCase

  alias Studor.TutorSubjectAreas
  alias Studor.TutorSubjectAreas.TutorSubjectArea

  @create_attrs %{

  }
  @update_attrs %{

  }
  @invalid_attrs %{}

  def fixture(:tutor_subject_area) do
    {:ok, tutor_subject_area} = TutorSubjectAreas.create_tutor_subject_area(@create_attrs)
    tutor_subject_area
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tutor_subject_areas", %{conn: conn} do
      conn = get(conn, Routes.tutor_subject_area_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create tutor_subject_area" do
    test "renders tutor_subject_area when data is valid", %{conn: conn} do
      conn = post(conn, Routes.tutor_subject_area_path(conn, :create), tutor_subject_area: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.tutor_subject_area_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.tutor_subject_area_path(conn, :create), tutor_subject_area: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update tutor_subject_area" do
    setup [:create_tutor_subject_area]

    test "renders tutor_subject_area when data is valid", %{conn: conn, tutor_subject_area: %TutorSubjectArea{id: id} = tutor_subject_area} do
      conn = put(conn, Routes.tutor_subject_area_path(conn, :update, tutor_subject_area), tutor_subject_area: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.tutor_subject_area_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, tutor_subject_area: tutor_subject_area} do
      conn = put(conn, Routes.tutor_subject_area_path(conn, :update, tutor_subject_area), tutor_subject_area: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete tutor_subject_area" do
    setup [:create_tutor_subject_area]

    test "deletes chosen tutor_subject_area", %{conn: conn, tutor_subject_area: tutor_subject_area} do
      conn = delete(conn, Routes.tutor_subject_area_path(conn, :delete, tutor_subject_area))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.tutor_subject_area_path(conn, :show, tutor_subject_area))
      end
    end
  end

  defp create_tutor_subject_area(_) do
    tutor_subject_area = fixture(:tutor_subject_area)
    {:ok, tutor_subject_area: tutor_subject_area}
  end
end
