defmodule Studor.Repo.Migrations.CreateTimeBlocks do
  use Ecto.Migration

  def change do
    create table(:time_blocks) do
      add :start_time, :utc_datetime
      add :end_time, :utc_datetime

      timestamps()
    end

  end
end
