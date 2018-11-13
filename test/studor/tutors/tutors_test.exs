defmodule Studor.TutorsTest do
  use Studor.DataCase

  alias Studor.Tutors

  describe "tutors" do
    alias Studor.Tutors.Tutor

    @valid_attrs %{email: "some email", gpa: 120.5, password_hash: "some password_hash", paypal_token: "some paypal_token", profile_pic_url: "some profile_pic_url"}
    @update_attrs %{email: "some updated email", gpa: 456.7, password_hash: "some updated password_hash", paypal_token: "some updated paypal_token", profile_pic_url: "some updated profile_pic_url"}
    @invalid_attrs %{email: nil, gpa: nil, password_hash: nil, paypal_token: nil, profile_pic_url: nil}

    def tutor_fixture(attrs \\ %{}) do
      {:ok, tutor} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Tutors.create_tutor()

      tutor
    end

    test "list_tutors/0 returns all tutors" do
      tutor = tutor_fixture()
      assert Tutors.list_tutors() == [tutor]
    end

    test "get_tutor!/1 returns the tutor with given id" do
      tutor = tutor_fixture()
      assert Tutors.get_tutor!(tutor.id) == tutor
    end

    test "create_tutor/1 with valid data creates a tutor" do
      assert {:ok, %Tutor{} = tutor} = Tutors.create_tutor(@valid_attrs)
      assert tutor.email == "some email"
      assert tutor.gpa == 120.5
      assert tutor.password_hash == "some password_hash"
      assert tutor.paypal_token == "some paypal_token"
      assert tutor.profile_pic_url == "some profile_pic_url"
    end

    test "create_tutor/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tutors.create_tutor(@invalid_attrs)
    end

    test "update_tutor/2 with valid data updates the tutor" do
      tutor = tutor_fixture()
      assert {:ok, %Tutor{} = tutor} = Tutors.update_tutor(tutor, @update_attrs)
      assert tutor.email == "some updated email"
      assert tutor.gpa == 456.7
      assert tutor.password_hash == "some updated password_hash"
      assert tutor.paypal_token == "some updated paypal_token"
      assert tutor.profile_pic_url == "some updated profile_pic_url"
    end

    test "update_tutor/2 with invalid data returns error changeset" do
      tutor = tutor_fixture()
      assert {:error, %Ecto.Changeset{}} = Tutors.update_tutor(tutor, @invalid_attrs)
      assert tutor == Tutors.get_tutor!(tutor.id)
    end

    test "delete_tutor/1 deletes the tutor" do
      tutor = tutor_fixture()
      assert {:ok, %Tutor{}} = Tutors.delete_tutor(tutor)
      assert_raise Ecto.NoResultsError, fn -> Tutors.get_tutor!(tutor.id) end
    end

    test "change_tutor/1 returns a tutor changeset" do
      tutor = tutor_fixture()
      assert %Ecto.Changeset{} = Tutors.change_tutor(tutor)
    end
  end
end
