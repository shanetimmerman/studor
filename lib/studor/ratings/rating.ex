defmodule Studor.Ratings.Rating do
  use Ecto.Schema
  import Ecto.Changeset


  schema "ratings" do
    field :date, :utc_datetime
    field :description, :string
    field :stars, :integer
    belongs_to :tutor, Studor.Tutors.Tutor
    belongs_to :student, Studor.Students.Student

    timestamps()
  end

  @doc false
  def changeset(rating, attrs) do
    rating
    |> cast(attrs, [:stars, :description, :date])
    |> validate_required([:stars, :description, :date])
  end
end
