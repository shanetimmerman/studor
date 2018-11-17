defmodule StudorWeb.TutorAvailabilityControllerTest do
  use StudorWeb.ConnCase

  alias Studor.TutorAvailabilities
  alias Studor.TutorAvailabilities.TutorAvailability

  @create_attrs %{

  }
  @update_attrs %{

  }
  @invalid_attrs %{}

  def fixture(:tutor_availability) do
    {:ok, tutor_availability} = TutorAvailabilities.create_tutor_availability(@create_attrs)
    tutor_availability
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tutor_availabilities", %{conn: conn} do
      conn = get(conn, Routes.tutor_availability_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create tutor_availability" do
    test "renders tutor_availability when data is valid", %{conn: conn} do
      conn = post(conn, Routes.tutor_availability_path(conn, :create), tutor_availability: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.tutor_availability_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.tutor_availability_path(conn, :create), tutor_availability: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update tutor_availability" do
    setup [:create_tutor_availability]

    test "renders tutor_availability when data is valid", %{conn: conn, tutor_availability: %TutorAvailability{id: id} = tutor_availability} do
      conn = put(conn, Routes.tutor_availability_path(conn, :update, tutor_availability), tutor_availability: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.tutor_availability_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, tutor_availability: tutor_availability} do
      conn = put(conn, Routes.tutor_availability_path(conn, :update, tutor_availability), tutor_availability: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete tutor_availability" do
    setup [:create_tutor_availability]

    test "deletes chosen tutor_availability", %{conn: conn, tutor_availability: tutor_availability} do
      conn = delete(conn, Routes.tutor_availability_path(conn, :delete, tutor_availability))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.tutor_availability_path(conn, :show, tutor_availability))
      end
    end
  end

  defp create_tutor_availability(_) do
    tutor_availability = fixture(:tutor_availability)
    {:ok, tutor_availability: tutor_availability}
  end
end
