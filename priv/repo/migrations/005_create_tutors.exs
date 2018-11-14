defmodule Studor.Repo.Migrations.CreateTutors do
  use Ecto.Migration

  def change do
    create table(:tutors) do
      add :email, :string
      add :name, :string
      add :password_hash, :string
      add :paypal_token, :string
      add :profile_pic_url, :string
      add :gpa, :float
      add :university_id, references(:universities, on_delete: :nothing)

      timestamps()
    end

    create index(:tutors, [:university_id])
  end
end
