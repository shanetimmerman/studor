defmodule Studor.TutorSubjectAreas.TutorSubjectArea do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tutor_subject_areas" do
    belongs_to :subject_area, Studor.SubjectAreas.SubjectArea
    belongs_to :tutor, Studor.Tutors.Tutor

    timestamps()
  end

  @doc false
  def changeset(tutor_subject_area, attrs) do
    tutor_subject_area
    |> cast(attrs, [:tutor_id, :subject_area_id])
    |> validate_required([])
  end
end
