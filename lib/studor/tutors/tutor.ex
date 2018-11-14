defmodule Studor.Tutors.Tutor do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tutors" do
    field :email, :string
    field :name, :string
    field :gpa, :float
    field :password_hash, :string
    field :paypal_token, :string
    field :profile_pic_url, :string
    field :university_id, :id

    timestamps()
  end

  @doc false
  def changeset(tutor, attrs) do
    tutor
    |> cast(attrs, [:email, :name, :password_hash, :paypal_token, :profile_pic_url, :gpa])
    |> validate_required([:email, :name, :password_hash, :paypal_token, :profile_pic_url, :gpa])
  end
end
