defmodule StudorWeb.TutorCourseView do
  use StudorWeb, :view
  alias StudorWeb.TutorCourseView

  def render("index.json", %{tutor_courses: tutor_courses}) do
    %{data: render_many(tutor_courses, TutorCourseView, "tutor_course.json")}
  end

  def render("show.json", %{tutor_course: tutor_course}) do
    %{data: render_one(tutor_course, TutorCourseView, "tutor_course.json")}
  end

  def render("tutor_course.json", %{tutor_course: tutor_course}) do
    %{id: tutor_course.id}
  end
end
