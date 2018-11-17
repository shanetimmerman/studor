defmodule Studor.SessionFilesTest do
  use Studor.DataCase

  alias Studor.SessionFiles

  describe "session_files" do
    alias Studor.SessionFiles.SessionFile

    @valid_attrs %{file_url: "some file_url"}
    @update_attrs %{file_url: "some updated file_url"}
    @invalid_attrs %{file_url: nil}

    def session_file_fixture(attrs \\ %{}) do
      {:ok, session_file} =
        attrs
        |> Enum.into(@valid_attrs)
        |> SessionFiles.create_session_file()

      session_file
    end

    test "list_session_files/0 returns all session_files" do
      session_file = session_file_fixture()
      assert SessionFiles.list_session_files() == [session_file]
    end

    test "get_session_file!/1 returns the session_file with given id" do
      session_file = session_file_fixture()
      assert SessionFiles.get_session_file!(session_file.id) == session_file
    end

    test "create_session_file/1 with valid data creates a session_file" do
      assert {:ok, %SessionFile{} = session_file} = SessionFiles.create_session_file(@valid_attrs)
      assert session_file.file_url == "some file_url"
    end

    test "create_session_file/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = SessionFiles.create_session_file(@invalid_attrs)
    end

    test "update_session_file/2 with valid data updates the session_file" do
      session_file = session_file_fixture()
      assert {:ok, %SessionFile{} = session_file} = SessionFiles.update_session_file(session_file, @update_attrs)
      assert session_file.file_url == "some updated file_url"
    end

    test "update_session_file/2 with invalid data returns error changeset" do
      session_file = session_file_fixture()
      assert {:error, %Ecto.Changeset{}} = SessionFiles.update_session_file(session_file, @invalid_attrs)
      assert session_file == SessionFiles.get_session_file!(session_file.id)
    end

    test "delete_session_file/1 deletes the session_file" do
      session_file = session_file_fixture()
      assert {:ok, %SessionFile{}} = SessionFiles.delete_session_file(session_file)
      assert_raise Ecto.NoResultsError, fn -> SessionFiles.get_session_file!(session_file.id) end
    end

    test "change_session_file/1 returns a session_file changeset" do
      session_file = session_file_fixture()
      assert %Ecto.Changeset{} = SessionFiles.change_session_file(session_file)
    end
  end
end
