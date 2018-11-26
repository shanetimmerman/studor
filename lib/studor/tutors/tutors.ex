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

  def search_courses(university_id, query) do
    query = from tutor in Studor.Tutors.Tutor,
    join: tcourse in Studor.TutorCourses.TutorCourse,
    join: course in Studor.Courses.Course,
    where: tcourse.course_id  == course.id # tutor course and course are aligned
    and ^university_id == course.university_id # course is from the right university
    and tcourse.tutor_id == tutor.id # tutor teaches the course
    and tutor.university_id == ^university_id
    and (fragment("levenshtein(?, ?)", ^query, course.course_name) <= 8
         or fragment("levenshtein(?, ?)", ^query, course.course_no)  <= 8), # Levenshtein distance for similar queries
    distinct: true,
    select: tutor

    Repo.all(query)
  end

  def search_courses(university_id) do
    query = from tutor in Studor.Tutors.Tutor,
    where: tutor.university_id == ^university_id,
    select: tutor

    Repo.all(query)
  end

  def search_subjects(subect_area_id) do
    query = from tutor in Studor.Tutors.Tutor,
    join: tsubject_area in Studor.TutorSubjectAreas.TutorSubjectArea,
    join: subject_area in Studor.SubjectAreas.SubjectArea,
    where: tsubject_area.subject_area_id  == subject_area.id # tutor subject area and subject area are aligned
    and ^subect_area_id == subject_area.id # the subject area and the current subject area match
    and tsubject_area.tutor_id == tutor.id, # the tutor teaches it
    distinct: true,
    select: tutor

    Repo.all(query)
  end

  def average_rating(tutor_id) do
    query = from rating in Studor.Ratings.Rating,
    where: rating.tutor_id == ^tutor_id,
    select: rating.stars

    ratings = Repo.all(query)

    if (ratings == []) do 0 else
      total = Enum.reduce(ratings, fn rating, acc -> acc + rating end)

      if (total == 0) do 0 else total / length(ratings) end
    end
  end

  def get_subject_areas(tutor_id) do
    query = from tsubarea in Studor.TutorSubjectAreas.TutorSubjectArea,
    join: subarea in Studor.SubjectAreas.SubjectArea,
    where: tsubarea.tutor_id == ^tutor_id
    and tsubarea.subject_area_id == subarea.id,
    select: %{name: subarea.subject_area, id: tsubarea.id}

    Repo.all(query)
  end

  def get_courses(tutor_id) do
    query = from tcourse in Studor.TutorCourses.TutorCourse,
    join: course in Studor.Courses.Course,
    where: tcourse.tutor_id == ^tutor_id
    and tcourse.course_id == course.id,
    select: %{name: course.course_name, number: course.course_no, tutor_course_id: tcourse.id, course_id: tcourse.course_id}

    Repo.all(query)
  end

  def get_availability(tutor_id) do
    query = from timeblock in Studor.TimeBlocks.TimeBlock,
    join: tutor_avail in Studor.TutorAvailabilities.TutorAvailability,
    where: tutor_avail.tutor_id == ^tutor_id and tutor_avail.time_block_id == timeblock.id,
    select: %{:end => timeblock.end_time, :start => timeblock.start_time, :tutor_availability_id => tutor_avail.id, :timeblock_id => timeblock.id}

    Repo.all(query)
  end

  def get_user_by_email(email) do
    Repo.get_by(Tutor, email: email)
  end

  def get_and_auth_user(email, password) do
    user = get_user_by_email(email)
    case Comeonin.Argon2.check_pass(user, password) do
      {:ok, user} -> user
      _else       -> nil
    end
  end
end
