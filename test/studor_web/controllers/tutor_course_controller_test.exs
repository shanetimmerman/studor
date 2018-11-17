defmodule StudorWeb.TutorCourseControllerTest do
  use StudorWeb.ConnCase

  alias Studor.TutorCourses
  alias Studor.TutorCourses.TutorCourse

  @create_attrs %{

  }
  @update_attrs %{

  }
  @invalid_attrs %{}

  def fixture(:tutor_course) do
    {:ok, tutor_course} = TutorCourses.create_tutor_course(@create_attrs)
    tutor_course
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tutor_courses", %{conn: conn} do
      conn = get(conn, Routes.tutor_course_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create tutor_course" do
    test "renders tutor_course when data is valid", %{conn: conn} do
      conn = post(conn, Routes.tutor_course_path(conn, :create), tutor_course: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.tutor_course_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.tutor_course_path(conn, :create), tutor_course: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update tutor_course" do
    setup [:create_tutor_course]

    test "renders tutor_course when data is valid", %{conn: conn, tutor_course: %TutorCourse{id: id} = tutor_course} do
      conn = put(conn, Routes.tutor_course_path(conn, :update, tutor_course), tutor_course: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.tutor_course_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, tutor_course: tutor_course} do
      conn = put(conn, Routes.tutor_course_path(conn, :update, tutor_course), tutor_course: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete tutor_course" do
    setup [:create_tutor_course]

    test "deletes chosen tutor_course", %{conn: conn, tutor_course: tutor_course} do
      conn = delete(conn, Routes.tutor_course_path(conn, :delete, tutor_course))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.tutor_course_path(conn, :show, tutor_course))
      end
    end
  end

  defp create_tutor_course(_) do
    tutor_course = fixture(:tutor_course)
    {:ok, tutor_course: tutor_course}
  end
end
