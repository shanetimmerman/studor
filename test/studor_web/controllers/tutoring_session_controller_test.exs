defmodule StudorWeb.TutoringSessionControllerTest do
  use StudorWeb.ConnCase

  alias Studor.TutoringSessions
  alias Studor.TutoringSessions.TutoringSession

  @create_attrs %{
    approved: true,
    description: "some description"
  }
  @update_attrs %{
    approved: false,
    description: "some updated description"
  }
  @invalid_attrs %{approved: nil, description: nil}

  def fixture(:tutoring_session) do
    {:ok, tutoring_session} = TutoringSessions.create_tutoring_session(@create_attrs)
    tutoring_session
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tutoring_sessions", %{conn: conn} do
      conn = get(conn, Routes.tutoring_session_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create tutoring_session" do
    test "renders tutoring_session when data is valid", %{conn: conn} do
      conn = post(conn, Routes.tutoring_session_path(conn, :create), tutoring_session: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.tutoring_session_path(conn, :show, id))

      assert %{
               "id" => id,
               "approved" => true,
               "description" => "some description"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.tutoring_session_path(conn, :create), tutoring_session: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update tutoring_session" do
    setup [:create_tutoring_session]

    test "renders tutoring_session when data is valid", %{conn: conn, tutoring_session: %TutoringSession{id: id} = tutoring_session} do
      conn = put(conn, Routes.tutoring_session_path(conn, :update, tutoring_session), tutoring_session: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.tutoring_session_path(conn, :show, id))

      assert %{
               "id" => id,
               "approved" => false,
               "description" => "some updated description"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, tutoring_session: tutoring_session} do
      conn = put(conn, Routes.tutoring_session_path(conn, :update, tutoring_session), tutoring_session: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete tutoring_session" do
    setup [:create_tutoring_session]

    test "deletes chosen tutoring_session", %{conn: conn, tutoring_session: tutoring_session} do
      conn = delete(conn, Routes.tutoring_session_path(conn, :delete, tutoring_session))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.tutoring_session_path(conn, :show, tutoring_session))
      end
    end
  end

  defp create_tutoring_session(_) do
    tutoring_session = fixture(:tutoring_session)
    {:ok, tutoring_session: tutoring_session}
  end
end
