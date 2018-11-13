defmodule Studor.Availabilities do
  @moduledoc """
  The Availabilities context.
  """

  import Ecto.Query, warn: false
  alias Studor.Repo

  alias Studor.Availabilities.Availability

  @doc """
  Returns the list of availabilities.

  ## Examples

      iex> list_availabilities()
      [%Availability{}, ...]

  """
  def list_availabilities do
    Repo.all(Availability)
  end

  @doc """
  Gets a single availability.

  Raises `Ecto.NoResultsError` if the Availability does not exist.

  ## Examples

      iex> get_availability!(123)
      %Availability{}

      iex> get_availability!(456)
      ** (Ecto.NoResultsError)

  """
  def get_availability!(id), do: Repo.get!(Availability, id)

  @doc """
  Creates a availability.

  ## Examples

      iex> create_availability(%{field: value})
      {:ok, %Availability{}}

      iex> create_availability(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_availability(attrs \\ %{}) do
    %Availability{}
    |> Availability.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a availability.

  ## Examples

      iex> update_availability(availability, %{field: new_value})
      {:ok, %Availability{}}

      iex> update_availability(availability, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_availability(%Availability{} = availability, attrs) do
    availability
    |> Availability.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Availability.

  ## Examples

      iex> delete_availability(availability)
      {:ok, %Availability{}}

      iex> delete_availability(availability)
      {:error, %Ecto.Changeset{}}

  """
  def delete_availability(%Availability{} = availability) do
    Repo.delete(availability)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking availability changes.

  ## Examples

      iex> change_availability(availability)
      %Ecto.Changeset{source: %Availability{}}

  """
  def change_availability(%Availability{} = availability) do
    Availability.changeset(availability, %{})
  end
end
