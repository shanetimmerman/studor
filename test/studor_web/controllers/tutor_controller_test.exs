defmodule StudorWeb.TutorControllerTest do
  use StudorWeb.ConnCase

  alias Studor.Tutors
  alias Studor.Tutors.Tutor

  @create_attrs %{
    email: "some email",
    gpa: 120.5,
    password_hash: "some password_hash",
    paypal_token: "some paypal_token",
    profile_pic_url: "some profile_pic_url"
  }
  @update_attrs %{
    email: "some updated email",
    gpa: 456.7,
    password_hash: "some updated password_hash",
    paypal_token: "some updated paypal_token",
    profile_pic_url: "some updated profile_pic_url"
  }
  @invalid_attrs %{email: nil, gpa: nil, password_hash: nil, paypal_token: nil, profile_pic_url: nil}

  def fixture(:tutor) do
    {:ok, tutor} = Tutors.create_tutor(@create_attrs)
    tutor
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tutors", %{conn: conn} do
      conn = get(conn, Routes.tutor_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create tutor" do
    test "renders tutor when data is valid", %{conn: conn} do
      conn = post(conn, Routes.tutor_path(conn, :create), tutor: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.tutor_path(conn, :show, id))

      assert %{
               "id" => id,
               "email" => "some email",
               "gpa" => 120.5,
               "password_hash" => "some password_hash",
               "paypal_token" => "some paypal_token",
               "profile_pic_url" => "some profile_pic_url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.tutor_path(conn, :create), tutor: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update tutor" do
    setup [:create_tutor]

    test "renders tutor when data is valid", %{conn: conn, tutor: %Tutor{id: id} = tutor} do
      conn = put(conn, Routes.tutor_path(conn, :update, tutor), tutor: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.tutor_path(conn, :show, id))

      assert %{
               "id" => id,
               "email" => "some updated email",
               "gpa" => 456.7,
               "password_hash" => "some updated password_hash",
               "paypal_token" => "some updated paypal_token",
               "profile_pic_url" => "some updated profile_pic_url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, tutor: tutor} do
      conn = put(conn, Routes.tutor_path(conn, :update, tutor), tutor: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete tutor" do
    setup [:create_tutor]

    test "deletes chosen tutor", %{conn: conn, tutor: tutor} do
      conn = delete(conn, Routes.tutor_path(conn, :delete, tutor))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.tutor_path(conn, :show, tutor))
      end
    end
  end

  defp create_tutor(_) do
    tutor = fixture(:tutor)
    {:ok, tutor: tutor}
  end
end
