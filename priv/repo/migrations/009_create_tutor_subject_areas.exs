defmodule Studor.Repo.Migrations.CreateTutorSubjectAreas do
  use Ecto.Migration

  def change do
    create table(:tutor_subject_areas) do
      add :tutor_id, references(:tutors, on_delete: :nothing)
      add :subject_area_id, references(:subject_areas, on_delete: :nothing)

      timestamps()
    end

    create index(:tutor_subject_areas, [:tutor_id])
    create index(:tutor_subject_areas, [:subject_area_id])
  end
end
