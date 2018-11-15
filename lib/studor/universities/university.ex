defmodule Studor.Universities.University do
  use Ecto.Schema
  import Ecto.Changeset


  schema "universities" do
    field :name, :string

    has_many :courses, Studor.Courses.Course
    has_many :tutors, Studor.Tutors.Tutor

    timestamps()
  end

  @doc false
  def changeset(university, attrs) do
    university
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
