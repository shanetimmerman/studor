defmodule Studor.Repo.Migrations.CreateTutorSubjectAreas do
  use Ecto.Migration

  def change do
    create table(:tutor_subject_areas) do
      add :subject_area_id, references(:subject_areas, on_delete: :delete_all)
      add :tutor_id, references(:tutors, on_delete: :delete_all)

      timestamps()
    end

    create index(:tutor_subject_areas, [:subject_area_id])
    create index(:tutor_subject_areas, [:tutor_id])
  end
end
