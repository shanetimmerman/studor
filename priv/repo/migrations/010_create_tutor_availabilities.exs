defmodule Studor.Repo.Migrations.CreateTutorAvailabilities do
  use Ecto.Migration

  def change do
    create table(:tutor_availabilities) do
      add :time_block_id, references(:time_blocks, on_delete: :delete_all)
      add :tutor_id, references(:tutors, on_delete: :delete_all)

      timestamps()
    end

    create index(:tutor_availabilities, [:time_block_id])
    create index(:tutor_availabilities, [:tutor_id])
  end
end
