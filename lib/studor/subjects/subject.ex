defmodule Studor.Subjects.Subject do
  use Ecto.Schema
  import Ecto.Changeset


  schema "subjects" do
    field :subject, :string

    timestamps()
  end

  @doc false
  def changeset(subject, attrs) do
    subject
    |> cast(attrs, [:subject])
    |> validate_required([:subject])
  end
end
