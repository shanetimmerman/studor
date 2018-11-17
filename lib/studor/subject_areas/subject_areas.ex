defmodule Studor.SubjectAreas do
  @moduledoc """
  The SubjectAreas context.
  """

  import Ecto.Query, warn: false
  alias Studor.Repo

  alias Studor.SubjectAreas.SubjectArea

  @doc """
  Returns the list of subject_areas.

  ## Examples

      iex> list_subject_areas()
      [%SubjectArea{}, ...]

  """
  def list_subject_areas do
    Repo.all(SubjectArea)
  end

  @doc """
  Gets a single subject_area.

  Raises `Ecto.NoResultsError` if the Subject area does not exist.

  ## Examples

      iex> get_subject_area!(123)
      %SubjectArea{}

      iex> get_subject_area!(456)
      ** (Ecto.NoResultsError)

  """
  def get_subject_area!(id), do: Repo.get!(SubjectArea, id)

  @doc """
  Creates a subject_area.

  ## Examples

      iex> create_subject_area(%{field: value})
      {:ok, %SubjectArea{}}

      iex> create_subject_area(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_subject_area(attrs \\ %{}) do
    %SubjectArea{}
    |> SubjectArea.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a subject_area.

  ## Examples

      iex> update_subject_area(subject_area, %{field: new_value})
      {:ok, %SubjectArea{}}

      iex> update_subject_area(subject_area, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_subject_area(%SubjectArea{} = subject_area, attrs) do
    subject_area
    |> SubjectArea.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a SubjectArea.

  ## Examples

      iex> delete_subject_area(subject_area)
      {:ok, %SubjectArea{}}

      iex> delete_subject_area(subject_area)
      {:error, %Ecto.Changeset{}}

  """
  def delete_subject_area(%SubjectArea{} = subject_area) do
    Repo.delete(subject_area)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking subject_area changes.

  ## Examples

      iex> change_subject_area(subject_area)
      %Ecto.Changeset{source: %SubjectArea{}}

  """
  def change_subject_area(%SubjectArea{} = subject_area) do
    SubjectArea.changeset(subject_area, %{})
  end
end
