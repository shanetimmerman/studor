defmodule Studor.TutoringSessions.TutoringSession do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tutoring_sessions" do
    field :approved, :boolean, default: false
    field :description, :string
    field :tutor_id, :id
    field :student_id, :id
    field :time_block_id, :id
    field :course_id, :id
    field :subject_area_id, :id

    timestamps()
  end

  @doc false
  def changeset(tutoring_session, attrs) do
    tutoring_session
    |> cast(attrs, [:description, :approved])
    |> validate_required([:description, :approved])
  end
end
