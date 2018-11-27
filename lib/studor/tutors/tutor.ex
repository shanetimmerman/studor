defmodule Studor.Tutors.Tutor do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tutors" do
    field :email, :string
    field :name, :string
    field :bio, :string
    field :gpa, :float
    field :password_hash, :string
    field :paypal_email, :string
    field :profile_pic_url, :string

    belongs_to :university, Studor.Universities.University

    has_many :ratings, Studor.Ratings.Rating
    has_many :tutoring_sessions, Studor.TutoringSessions.TutoringSession
    has_many :tutor_availabilities, Studor.TutorAvailabilities.TutorAvailability
    has_many :tutor_courses, Studor.TutorCourses.TutorCourse
    has_many :tutor_subject_areas, Studor.TutorSubjectAreas.TutorSubjectArea

    timestamps()
  end

  @doc false
  def changeset(tutor, attrs) do
    tutor
    |> cast(attrs, [:email, :name, :bio, :password_hash, :paypal_email, :profile_pic_url, :gpa, :university_id])
    |> validate_required([:email, :name, :password_hash, :paypal_email, :gpa])
    |> unique_constraint(:email)
    |> validate_format(:email, ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
    |> validate_format(:paypal_email, ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
  end
end
