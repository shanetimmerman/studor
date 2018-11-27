defmodule Studor.Repo.Migrations.CreateTutors do
  use Ecto.Migration

  def change do
    create table(:tutors) do
      add :email, :string, null: false
      add :name, :string, null: false
      add :bio, :string
      add :password_hash, :string, null: false
      add :paypal_email, :string, null: false
      add :profile_pic_url, :string
      add :gpa, :float, null: false
      add :university_id, references(:universities, on_delete: :nilify_all)

      timestamps()
    end

    create index(:tutors, [:university_id])
  end
end
