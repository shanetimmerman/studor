defmodule Studor.Tutors do
  @moduledoc """
  The Tutors context.
  """

  import Ecto.Query, warn: false
  alias Studor.Repo

  alias Studor.Tutors.Tutor

  @doc """
  Returns the list of tutors.

  ## Examples

      iex> list_tutors()
      [%Tutor{}, ...]

  """
  def list_tutors do
    Repo.all(Tutor)
  end

  @doc """
  Gets a single tutor.

  Raises `Ecto.NoResultsError` if the Tutor does not exist.

  ## Examples

      iex> get_tutor!(123)
      %Tutor{}

      iex> get_tutor!(456)
      ** (Ecto.NoResultsError)

  """
  def get_tutor!(id), do: Repo.get!(Tutor, id)

  @doc """
  Creates a tutor.

  ## Examples

      iex> create_tutor(%{field: value})
      {:ok, %Tutor{}}

      iex> create_tutor(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_tutor(attrs \\ %{}) do
    %Tutor{}
    |> Tutor.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a tutor.

  ## Examples

      iex> update_tutor(tutor, %{field: new_value})
      {:ok, %Tutor{}}

      iex> update_tutor(tutor, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_tutor(%Tutor{} = tutor, attrs) do
    tutor
    |> Tutor.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Tutor.

  ## Examples

      iex> delete_tutor(tutor)
      {:ok, %Tutor{}}

      iex> delete_tutor(tutor)
      {:error, %Ecto.Changeset{}}

  """
  def delete_tutor(%Tutor{} = tutor) do
    Repo.delete(tutor)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking tutor changes.

  ## Examples

      iex> change_tutor(tutor)
      %Ecto.Changeset{source: %Tutor{}}

  """
  def change_tutor(%Tutor{} = tutor) do
    Tutor.changeset(tutor, %{})
  end
end
