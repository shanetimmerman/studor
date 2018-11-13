defmodule Studor.Repo.Migrations.CreateTutorCourses do
  use Ecto.Migration

  def change do
    create table(:tutor_courses) do
      add :course_id, references(:courses, on_delete: :nothing)
      add :tutor_id, references(:tutors, on_delete: :nothing)

      timestamps()
    end

    create index(:tutor_courses, [:course_id])
    create index(:tutor_courses, [:tutor_id])
  end
end
