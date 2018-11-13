defmodule Studor.Repo.Migrations.CreateUniversities do
  use Ecto.Migration

  def change do
    create table(:universities) do
      add :name, :string

      timestamps()
    end

  end
end
