defmodule Studor.SessionFiles do
  @moduledoc """
  The SessionFiles context.
  """

  import Ecto.Query, warn: false
  alias Studor.Repo

  alias Studor.SessionFiles.SessionFile

  @doc """
  Returns the list of session_files.

  ## Examples

      iex> list_session_files()
      [%SessionFile{}, ...]

  """
  def list_session_files do
    Repo.all(SessionFile)
  end

  @doc """
  Gets a single session_file.

  Raises `Ecto.NoResultsError` if the Session file does not exist.

  ## Examples

      iex> get_session_file!(123)
      %SessionFile{}

      iex> get_session_file!(456)
      ** (Ecto.NoResultsError)

  """
  def get_session_file!(id), do: Repo.get!(SessionFile, id)

  @doc """
  Creates a session_file.

  ## Examples

      iex> create_session_file(%{field: value})
      {:ok, %SessionFile{}}

      iex> create_session_file(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_session_file(attrs \\ %{}) do
    %SessionFile{}
    |> SessionFile.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a session_file.

  ## Examples

      iex> update_session_file(session_file, %{field: new_value})
      {:ok, %SessionFile{}}

      iex> update_session_file(session_file, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_session_file(%SessionFile{} = session_file, attrs) do
    session_file
    |> SessionFile.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a SessionFile.

  ## Examples

      iex> delete_session_file(session_file)
      {:ok, %SessionFile{}}

      iex> delete_session_file(session_file)
      {:error, %Ecto.Changeset{}}

  """
  def delete_session_file(%SessionFile{} = session_file) do
    Repo.delete(session_file)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking session_file changes.

  ## Examples

      iex> change_session_file(session_file)
      %Ecto.Changeset{source: %SessionFile{}}

  """
  def change_session_file(%SessionFile{} = session_file) do
    SessionFile.changeset(session_file, %{})
  end
end
