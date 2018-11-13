defmodule Studor.TutorCourses.TutorCourse do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tutor_courses" do
    field :course_id, :id
    field :tutor_id, :id

    timestamps()
  end

  @doc false
  def changeset(tutor_course, attrs) do
    tutor_course
    |> cast(attrs, [])
    |> validate_required([])
  end
end
