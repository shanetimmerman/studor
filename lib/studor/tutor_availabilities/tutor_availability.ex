defmodule Studor.TutorAvailabilities.TutorAvailability do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tutor_availabilities" do
    belongs_to :time_block, Studor.TimeBlocks.TimeBlock
    belongs_to :tutor, Studor.Tutors.Tutor

    timestamps()
  end

  @doc false
  def changeset(tutor_availability, attrs) do
    tutor_availability
    |> cast(attrs, [:time_block_id, :tutor_id])
    |> validate_required([])
  end
end
