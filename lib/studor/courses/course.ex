defmodule Studor.Courses.Course do
  use Ecto.Schema
  import Ecto.Changeset


  schema "courses" do
    field :course_name, :string
    field :course_no, :string
    field :university_id, :id

    timestamps()
  end

  @doc false
  def changeset(course, attrs) do
    course
    |> cast(attrs, [:course_no, :course_name])
    |> validate_required([:course_no, :course_name])
  end
end
