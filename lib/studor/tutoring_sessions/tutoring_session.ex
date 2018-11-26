defmodule Studor.TutoringSessions.TutoringSession do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tutoring_sessions" do
    field :approved, :boolean, default: false
    field :description, :string
    field :payment_id, :string

    belongs_to :tutor, Studor.Tutors.Tutor
    belongs_to :student, Studor.Students.Student
    belongs_to :time_block, Studor.TimeBlocks.TimeBlock
    belongs_to :course, Studor.Courses.Course
    belongs_to :subject_area, Studor.SubjectAreas.SubjectArea

    has_many :session_files, Studor.SessionFiles.SessionFile

    timestamps()
  end

  @doc false
  def changeset(tutoring_session, attrs) do
    tutoring_session
    |> cast(attrs, [:description, :approved, :tutor_id, :student_id, :time_block_id, :payment_id])
    |> validate_required([:description, :approved, :tutor_id, :student_id, :time_block_id, :payment_id])
  end
end
