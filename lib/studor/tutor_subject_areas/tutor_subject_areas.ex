defmodule Studor.TutorSubjectAreas do
  @moduledoc """
  The TutorSubjectAreas context.
  """

  import Ecto.Query, warn: false
  alias Studor.Repo

  alias Studor.TutorSubjectAreas.TutorSubjectArea

  @doc """
  Returns the list of tutor_subject_areas.

  ## Examples

      iex> list_tutor_subject_areas()
      [%TutorSubjectArea{}, ...]

  """
  def list_tutor_subject_areas do
    Repo.all(TutorSubjectArea)
  end

  @doc """
  Gets a single tutor_subject_area.

  Raises `Ecto.NoResultsError` if the Tutor subject area does not exist.

  ## Examples

      iex> get_tutor_subject_area!(123)
      %TutorSubjectArea{}

      iex> get_tutor_subject_area!(456)
      ** (Ecto.NoResultsError)

  """
  def get_tutor_subject_area!(id), do: Repo.get!(TutorSubjectArea, id)

  @doc """
  Creates a tutor_subject_area.

  ## Examples

      iex> create_tutor_subject_area(%{field: value})
      {:ok, %TutorSubjectArea{}}

      iex> create_tutor_subject_area(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_tutor_subject_area(attrs \\ %{}) do
    %TutorSubjectArea{}
    |> TutorSubjectArea.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a tutor_subject_area.

  ## Examples

      iex> update_tutor_subject_area(tutor_subject_area, %{field: new_value})
      {:ok, %TutorSubjectArea{}}

      iex> update_tutor_subject_area(tutor_subject_area, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_tutor_subject_area(%TutorSubjectArea{} = tutor_subject_area, attrs) do
    tutor_subject_area
    |> TutorSubjectArea.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a TutorSubjectArea.

  ## Examples

      iex> delete_tutor_subject_area(tutor_subject_area)
      {:ok, %TutorSubjectArea{}}

      iex> delete_tutor_subject_area(tutor_subject_area)
      {:error, %Ecto.Changeset{}}

  """
  def delete_tutor_subject_area(%TutorSubjectArea{} = tutor_subject_area) do
    Repo.delete(tutor_subject_area)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking tutor_subject_area changes.

  ## Examples

      iex> change_tutor_subject_area(tutor_subject_area)
      %Ecto.Changeset{source: %TutorSubjectArea{}}

  """
  def change_tutor_subject_area(%TutorSubjectArea{} = tutor_subject_area) do
    TutorSubjectArea.changeset(tutor_subject_area, %{})
  end
end
