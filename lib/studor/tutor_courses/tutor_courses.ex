defmodule Studor.TutorCourses do
  @moduledoc """
  The TutorCourses context.
  """

  import Ecto.Query, warn: false
  alias Studor.Repo

  alias Studor.TutorCourses.TutorCourse

  @doc """
  Returns the list of tutor_courses.

  ## Examples

      iex> list_tutor_courses()
      [%TutorCourse{}, ...]

  """
  def list_tutor_courses do
    Repo.all(TutorCourse)
  end

  @doc """
  Gets a single tutor_course.

  Raises `Ecto.NoResultsError` if the Tutor course does not exist.

  ## Examples

      iex> get_tutor_course!(123)
      %TutorCourse{}

      iex> get_tutor_course!(456)
      ** (Ecto.NoResultsError)

  """
  def get_tutor_course!(id), do: Repo.get!(TutorCourse, id)

  @doc """
  Creates a tutor_course.

  ## Examples

      iex> create_tutor_course(%{field: value})
      {:ok, %TutorCourse{}}

      iex> create_tutor_course(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_tutor_course(attrs \\ %{}) do
    %TutorCourse{}
    |> TutorCourse.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a tutor_course.

  ## Examples

      iex> update_tutor_course(tutor_course, %{field: new_value})
      {:ok, %TutorCourse{}}

      iex> update_tutor_course(tutor_course, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_tutor_course(%TutorCourse{} = tutor_course, attrs) do
    tutor_course
    |> TutorCourse.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a TutorCourse.

  ## Examples

      iex> delete_tutor_course(tutor_course)
      {:ok, %TutorCourse{}}

      iex> delete_tutor_course(tutor_course)
      {:error, %Ecto.Changeset{}}

  """
  def delete_tutor_course(%TutorCourse{} = tutor_course) do
    Repo.delete(tutor_course)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking tutor_course changes.

  ## Examples

      iex> change_tutor_course(tutor_course)
      %Ecto.Changeset{source: %TutorCourse{}}

  """
  def change_tutor_course(%TutorCourse{} = tutor_course) do
    TutorCourse.changeset(tutor_course, %{})
  end
end
