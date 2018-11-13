defmodule Studor.StudentsTest do
  use Studor.DataCase

  alias Studor.Students

  describe "students" do
    alias Studor.Students.Student

    @valid_attrs %{email: "some email", password_hash: "some password_hash", paypal_token: "some paypal_token", profile_pic_url: "some profile_pic_url"}
    @update_attrs %{email: "some updated email", password_hash: "some updated password_hash", paypal_token: "some updated paypal_token", profile_pic_url: "some updated profile_pic_url"}
    @invalid_attrs %{email: nil, password_hash: nil, paypal_token: nil, profile_pic_url: nil}

    def student_fixture(attrs \\ %{}) do
      {:ok, student} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Students.create_student()

      student
    end

    test "list_students/0 returns all students" do
      student = student_fixture()
      assert Students.list_students() == [student]
    end

    test "get_student!/1 returns the student with given id" do
      student = student_fixture()
      assert Students.get_student!(student.id) == student
    end

    test "create_student/1 with valid data creates a student" do
      assert {:ok, %Student{} = student} = Students.create_student(@valid_attrs)
      assert student.email == "some email"
      assert student.password_hash == "some password_hash"
      assert student.paypal_token == "some paypal_token"
      assert student.profile_pic_url == "some profile_pic_url"
    end

    test "create_student/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Students.create_student(@invalid_attrs)
    end

    test "update_student/2 with valid data updates the student" do
      student = student_fixture()
      assert {:ok, %Student{} = student} = Students.update_student(student, @update_attrs)
      assert student.email == "some updated email"
      assert student.password_hash == "some updated password_hash"
      assert student.paypal_token == "some updated paypal_token"
      assert student.profile_pic_url == "some updated profile_pic_url"
    end

    test "update_student/2 with invalid data returns error changeset" do
      student = student_fixture()
      assert {:error, %Ecto.Changeset{}} = Students.update_student(student, @invalid_attrs)
      assert student == Students.get_student!(student.id)
    end

    test "delete_student/1 deletes the student" do
      student = student_fixture()
      assert {:ok, %Student{}} = Students.delete_student(student)
      assert_raise Ecto.NoResultsError, fn -> Students.get_student!(student.id) end
    end

    test "change_student/1 returns a student changeset" do
      student = student_fixture()
      assert %Ecto.Changeset{} = Students.change_student(student)
    end
  end
end
