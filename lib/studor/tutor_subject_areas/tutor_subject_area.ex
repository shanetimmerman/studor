defmodule Studor.TutorSubjectAreas.TutorSubjectArea do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tutor_subject_areas" do
    field :tutor_id, :id
    field :subject_area_id, :id

    timestamps()
  end

  @doc false
  def changeset(tutor_subject_area, attrs) do
    tutor_subject_area
    |> cast(attrs, [])
    |> validate_required([])
  end
end
