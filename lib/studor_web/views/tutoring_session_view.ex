defmodule StudorWeb.TutoringSessionView do
  use StudorWeb, :view
  alias StudorWeb.TutoringSessionView

  def render("index.json", %{tutoring_sessions: tutoring_sessions}) do
    %{data: render_many(tutoring_sessions, TutoringSessionView, "tutoring_session.json")}
  end

  def render("show.json", %{tutoring_session: tutoring_session}) do
    %{data: render_one(tutoring_session, TutoringSessionView, "tutoring_session.json")}
  end

  def render("tutoring_session.json", %{tutoring_session: tutoring_session}) do
    tutor = Studor.Tutors.get_tutor!(tutoring_session.tutor_id)
    student = Studor.Students.get_student!(tutoring_session.student_id)
    timeblock = Studor.TimeBlocks.get_time_block!(tutoring_session.time_block_id)

    %{id: tutoring_session.id,
      description: tutoring_session.description,
      approved: tutoring_session.approved,
      start: timeblock.start_time,
      end: timeblock.end_time,
      student: tutor.name,
      tutor: student.name}
  end
end
