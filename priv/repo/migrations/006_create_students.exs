defmodule Studor.Repo.Migrations.CreateStudents do
  use Ecto.Migration

  def change do
    create table(:students) do
      add :email, :string, null: false
      add :name, :string, null: false
      add :password_hash, :string, null: false
      add :paypal_token, :string, null: false
      add :profile_pic_url, :string

      timestamps()
    end

  end
end
