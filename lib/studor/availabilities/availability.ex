defmodule Studor.Availabilities.Availability do
  use Ecto.Schema
  import Ecto.Changeset


  schema "availabilities" do
    field :tutor_id, :id
    field :time_block_id, :id

    timestamps()
  end

  @doc false
  def changeset(availability, attrs) do
    availability
    |> cast(attrs, [])
    |> validate_required([])
  end
end
