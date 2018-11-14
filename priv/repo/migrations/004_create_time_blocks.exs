defmodule Studor.Repo.Migrations.CreateTimeBlocks do
  use Ecto.Migration

  def change do
    create table(:time_blocks) do
      add :start_time, :utc_datetime, null: false
      add :end_time, :utc_datetime, null: false

      timestamps()
    end

  end
end
