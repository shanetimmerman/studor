defmodule Studor.SessionFiles.SessionFile do
  use Ecto.Schema
  import Ecto.Changeset


  schema "session_files" do
    field :file_url, :string
    field :tutoring_session_id, :id

    timestamps()
  end

  @doc false
  def changeset(session_file, attrs) do
    session_file
    |> cast(attrs, [:file_url])
    |> validate_required([:file_url])
  end
end
