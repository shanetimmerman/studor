defmodule Studor.Students.Student do
  use Ecto.Schema
  import Ecto.Changeset


  schema "students" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :profile_pic_url, :string

    has_many :ratings, Studor.Ratings.Rating
    has_many :tutoring_sessions, Studor.TutoringSessions.TutoringSession

    timestamps()
  end

  @doc false
  def changeset(student, attrs) do
    student
    |> cast(attrs, [:email, :name, :password_hash, :profile_pic_url])
    |> validate_required([:email, :name, :password_hash])
    |> unique_constraint(:email)
    |> validate_format(:email, ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
  end
end
