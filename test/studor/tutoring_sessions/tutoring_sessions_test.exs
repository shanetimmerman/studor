defmodule Studor.TutoringSessionsTest do
  use Studor.DataCase

  alias Studor.TutoringSessions

  describe "tutoring_sessions" do
    alias Studor.TutoringSessions.TutoringSession

    @valid_attrs %{approved: true, description: "some description"}
    @update_attrs %{approved: false, description: "some updated description"}
    @invalid_attrs %{approved: nil, description: nil}

    def tutoring_session_fixture(attrs \\ %{}) do
      {:ok, tutoring_session} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TutoringSessions.create_tutoring_session()

      tutoring_session
    end

    test "list_tutoring_sessions/0 returns all tutoring_sessions" do
      tutoring_session = tutoring_session_fixture()
      assert TutoringSessions.list_tutoring_sessions() == [tutoring_session]
    end

    test "get_tutoring_session!/1 returns the tutoring_session with given id" do
      tutoring_session = tutoring_session_fixture()
      assert TutoringSessions.get_tutoring_session!(tutoring_session.id) == tutoring_session
    end

    test "create_tutoring_session/1 with valid data creates a tutoring_session" do
      assert {:ok, %TutoringSession{} = tutoring_session} = TutoringSessions.create_tutoring_session(@valid_attrs)
      assert tutoring_session.approved == true
      assert tutoring_session.description == "some description"
    end

    test "create_tutoring_session/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TutoringSessions.create_tutoring_session(@invalid_attrs)
    end

    test "update_tutoring_session/2 with valid data updates the tutoring_session" do
      tutoring_session = tutoring_session_fixture()
      assert {:ok, %TutoringSession{} = tutoring_session} = TutoringSessions.update_tutoring_session(tutoring_session, @update_attrs)
      assert tutoring_session.approved == false
      assert tutoring_session.description == "some updated description"
    end

    test "update_tutoring_session/2 with invalid data returns error changeset" do
      tutoring_session = tutoring_session_fixture()
      assert {:error, %Ecto.Changeset{}} = TutoringSessions.update_tutoring_session(tutoring_session, @invalid_attrs)
      assert tutoring_session == TutoringSessions.get_tutoring_session!(tutoring_session.id)
    end

    test "delete_tutoring_session/1 deletes the tutoring_session" do
      tutoring_session = tutoring_session_fixture()
      assert {:ok, %TutoringSession{}} = TutoringSessions.delete_tutoring_session(tutoring_session)
      assert_raise Ecto.NoResultsError, fn -> TutoringSessions.get_tutoring_session!(tutoring_session.id) end
    end

    test "change_tutoring_session/1 returns a tutoring_session changeset" do
      tutoring_session = tutoring_session_fixture()
      assert %Ecto.Changeset{} = TutoringSessions.change_tutoring_session(tutoring_session)
    end
  end
end
