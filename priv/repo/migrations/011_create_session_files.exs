defmodule Studor.Repo.Migrations.CreateSessionFiles do
  use Ecto.Migration

  def change do
    create table(:session_files) do
      add :file_url, :string
      add :tutoring_session_id, references(:tutoring_sessions, on_delete: :delete_all)

      timestamps()
    end

    create index(:session_files, [:tutoring_session_id])
  end
end
