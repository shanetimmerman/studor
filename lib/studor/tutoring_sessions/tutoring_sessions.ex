defmodule Studor.TutoringSessions do
  @moduledoc """
  The TutoringSessions context.
  """

  import Ecto.Query, warn: false
  alias Studor.Repo

  alias Studor.TutoringSessions.TutoringSession

  @doc """
  Returns the list of tutoring_sessions.

  ## Examples

      iex> list_tutoring_sessions()
      [%TutoringSession{}, ...]

  """
  def list_tutoring_sessions do
    Repo.all(TutoringSession)
  end

  @doc """
  Gets a single tutoring_session.

  Raises `Ecto.NoResultsError` if the Tutoring session does not exist.

  ## Examples

      iex> get_tutoring_session!(123)
      %TutoringSession{}

      iex> get_tutoring_session!(456)
      ** (Ecto.NoResultsError)

  """
  def get_tutoring_session!(id), do: Repo.get!(TutoringSession, id)

  @doc """
  Creates a tutoring_session.

  ## Examples

      iex> create_tutoring_session(%{field: value})
      {:ok, %TutoringSession{}}

      iex> create_tutoring_session(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_tutoring_session(attrs \\ %{}) do
    %TutoringSession{}
    |> TutoringSession.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a tutoring_session.

  ## Examples

      iex> update_tutoring_session(tutoring_session, %{field: new_value})
      {:ok, %TutoringSession{}}

      iex> update_tutoring_session(tutoring_session, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_tutoring_session(%TutoringSession{} = tutoring_session, attrs) do
    tutoring_session
    |> TutoringSession.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a TutoringSession.

  ## Examples

      iex> delete_tutoring_session(tutoring_session)
      {:ok, %TutoringSession{}}

      iex> delete_tutoring_session(tutoring_session)
      {:error, %Ecto.Changeset{}}

  """
  def delete_tutoring_session(%TutoringSession{} = tutoring_session) do
    Repo.delete(tutoring_session)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking tutoring_session changes.

  ## Examples

      iex> change_tutoring_session(tutoring_session)
      %Ecto.Changeset{source: %TutoringSession{}}

  """
  def change_tutoring_session(%TutoringSession{} = tutoring_session) do
    TutoringSession.changeset(tutoring_session, %{})
  end


  def list_tutoring_sessions_by_student_id(id) do
    query = from session in TutoringSession,
    preload: [:student],
    preload: [:tutor],
    where: session.student_id == ^id,
    select: session

    Repo.all(query)
  end

  def list_tutoring_sessions_by_tutor_id(id) do
    query = from session in TutoringSession,
    preload: [:student],
    preload: [:tutor],
    where: session.tutor_id == ^id,
    select: session

    Repo.all(query)
  end
end
