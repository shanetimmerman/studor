defmodule Studor.TutorAvailabilities do
  @moduledoc """
  The TutorAvailabilities context.
  """

  import Ecto.Query, warn: false
  alias Studor.Repo

  alias Studor.TutorAvailabilities.TutorAvailability

  @doc """
  Returns the list of tutor_availabilities.

  ## Examples

      iex> list_tutor_availabilities()
      [%TutorAvailability{}, ...]

  """
  def list_tutor_availabilities do
    Repo.all(TutorAvailability)
  end

  @doc """
  Gets a single tutor_availability.

  Raises `Ecto.NoResultsError` if the Tutor availability does not exist.

  ## Examples

      iex> get_tutor_availability!(123)
      %TutorAvailability{}

      iex> get_tutor_availability!(456)
      ** (Ecto.NoResultsError)

  """
  def get_tutor_availability!(id), do: Repo.get!(TutorAvailability, id)

  @doc """
  Creates a tutor_availability.

  ## Examples

      iex> create_tutor_availability(%{field: value})
      {:ok, %TutorAvailability{}}

      iex> create_tutor_availability(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_tutor_availability(attrs \\ %{}) do
    %TutorAvailability{}
    |> TutorAvailability.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a tutor_availability.

  ## Examples

      iex> update_tutor_availability(tutor_availability, %{field: new_value})
      {:ok, %TutorAvailability{}}

      iex> update_tutor_availability(tutor_availability, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_tutor_availability(%TutorAvailability{} = tutor_availability, attrs) do
    tutor_availability
    |> TutorAvailability.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a TutorAvailability.

  ## Examples

      iex> delete_tutor_availability(tutor_availability)
      {:ok, %TutorAvailability{}}

      iex> delete_tutor_availability(tutor_availability)
      {:error, %Ecto.Changeset{}}

  """
  def delete_tutor_availability(%TutorAvailability{} = tutor_availability) do
    Repo.delete(tutor_availability)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking tutor_availability changes.

  ## Examples

      iex> change_tutor_availability(tutor_availability)
      %Ecto.Changeset{source: %TutorAvailability{}}

  """
  def change_tutor_availability(%TutorAvailability{} = tutor_availability) do
    TutorAvailability.changeset(tutor_availability, %{})
  end
end
