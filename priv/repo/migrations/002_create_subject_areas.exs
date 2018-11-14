defmodule Studor.Repo.Migrations.CreateSubjectAreas do
  use Ecto.Migration

  def change do
    create table(:subject_areas) do
      add :subject_area, :string
      add :subject_id, references(:subjects, on_delete: :delete_all)

      timestamps()
    end

    create index(:subject_areas, [:subject_id])
  end
end
