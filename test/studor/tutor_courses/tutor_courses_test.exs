defmodule Studor.TutorCoursesTest do
  use Studor.DataCase

  alias Studor.TutorCourses

  describe "tutor_courses" do
    alias Studor.TutorCourses.TutorCourse

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def tutor_course_fixture(attrs \\ %{}) do
      {:ok, tutor_course} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TutorCourses.create_tutor_course()

      tutor_course
    end

    test "list_tutor_courses/0 returns all tutor_courses" do
      tutor_course = tutor_course_fixture()
      assert TutorCourses.list_tutor_courses() == [tutor_course]
    end

    test "get_tutor_course!/1 returns the tutor_course with given id" do
      tutor_course = tutor_course_fixture()
      assert TutorCourses.get_tutor_course!(tutor_course.id) == tutor_course
    end

    test "create_tutor_course/1 with valid data creates a tutor_course" do
      assert {:ok, %TutorCourse{} = tutor_course} = TutorCourses.create_tutor_course(@valid_attrs)
    end

    test "create_tutor_course/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TutorCourses.create_tutor_course(@invalid_attrs)
    end

    test "update_tutor_course/2 with valid data updates the tutor_course" do
      tutor_course = tutor_course_fixture()
      assert {:ok, %TutorCourse{} = tutor_course} = TutorCourses.update_tutor_course(tutor_course, @update_attrs)
    end

    test "update_tutor_course/2 with invalid data returns error changeset" do
      tutor_course = tutor_course_fixture()
      assert {:error, %Ecto.Changeset{}} = TutorCourses.update_tutor_course(tutor_course, @invalid_attrs)
      assert tutor_course == TutorCourses.get_tutor_course!(tutor_course.id)
    end

    test "delete_tutor_course/1 deletes the tutor_course" do
      tutor_course = tutor_course_fixture()
      assert {:ok, %TutorCourse{}} = TutorCourses.delete_tutor_course(tutor_course)
      assert_raise Ecto.NoResultsError, fn -> TutorCourses.get_tutor_course!(tutor_course.id) end
    end

    test "change_tutor_course/1 returns a tutor_course changeset" do
      tutor_course = tutor_course_fixture()
      assert %Ecto.Changeset{} = TutorCourses.change_tutor_course(tutor_course)
    end
  end
end
