defmodule Studor.Repo.Migrations.CreateTutorCourses do
  use Ecto.Migration

  def change do
    create table(:tutor_courses) do
      add :course_id, references(:courses, on_delete: :delete_all)
      add :tutor_id, references(:tutors, on_delete: :delete_all)

      timestamps()
    end

    create index(:tutor_courses, [:course_id])
    create index(:tutor_courses, [:tutor_id])
  end
end
