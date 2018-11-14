defmodule Studor.Repo.Migrations.CreateStudents do
  use Ecto.Migration

  def change do
    create table(:students) do
      add :email, :string
      add :name, :string
      add :password_hash, :string
      add :paypal_token, :string
      add :profile_pic_url, :string

      timestamps()
    end

  end
end
