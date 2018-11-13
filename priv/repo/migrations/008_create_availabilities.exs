defmodule Studor.Repo.Migrations.CreateAvailabilities do
  use Ecto.Migration

  def change do
    create table(:availabilities) do
      add :tutor_id, references(:tutors, on_delete: :nothing)
      add :time_block_id, references(:time_blocks, on_delete: :nothing)

      timestamps()
    end

    create index(:availabilities, [:tutor_id])
    create index(:availabilities, [:time_block_id])
  end
end
