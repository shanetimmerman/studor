defmodule Studor.TutorCourses.TutorCourse do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tutor_courses" do
    belongs_to :course, Studor.Courses.Course
    belongs_to :tutor, Studor.Tutors.Tutor

    timestamps()
  end

  @doc false
  def changeset(tutor_course, attrs) do
    tutor_course
    |> cast(attrs, [:course_id, :tutor_id])
    |> validate_required([])
  end
end
