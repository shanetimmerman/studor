defmodule Studor.Repo.Migrations.CreateTutoringSessions do
  use Ecto.Migration

  def change do
    create table(:tutoring_sessions) do
      add :description, :text
      add :approved, :boolean, default: false, null: false
      add :tutor_id, references(:tutors, on_delete: :nothing)
      add :student_id, references(:students, on_delete: :nothing)
      add :time_block_id, references(:time_blocks, on_delete: :nothing)
      add :course_id, references(:courses, on_delete: :nothing)
      add :subject_area_id, references(:subject_areas, on_delete: :nothing)

      timestamps()
    end

    create index(:tutoring_sessions, [:tutor_id])
    create index(:tutoring_sessions, [:student_id])
    create index(:tutoring_sessions, [:time_block_id])
    create index(:tutoring_sessions, [:course_id])
    create index(:tutoring_sessions, [:subject_area_id])
  end
end
