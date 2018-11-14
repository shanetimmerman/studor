defmodule Studor.Students.Student do
  use Ecto.Schema
  import Ecto.Changeset


  schema "students" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :paypal_token, :string
    field :profile_pic_url, :string

    timestamps()
  end

  @doc false
  def changeset(student, attrs) do
    student
    |> cast(attrs, [:email, :name, :password_hash, :paypal_token, :profile_pic_url])
    |> validate_required([:email, :name, :password_hash, :paypal_token, :profile_pic_url])
  end
end
