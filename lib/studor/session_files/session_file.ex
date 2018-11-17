defmodule Studor.SessionFiles.SessionFile do
  use Ecto.Schema
  import Ecto.Changeset


  schema "session_files" do
    field :file_url, :string
    belongs_to :tutoring_session, Studor.TutoringSessions.TutoringSession

    timestamps()
  end

  @doc false
  def changeset(session_file, attrs) do
    session_file
    |> cast(attrs, [:file_url])
    |> validate_required([:file_url])
  end
end
