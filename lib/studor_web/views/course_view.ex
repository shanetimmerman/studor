defmodule StudorWeb.CourseView do
  use StudorWeb, :view
  alias StudorWeb.CourseView

  def render("index.json", %{courses: courses}) do
    %{data: render_many(courses, CourseView, "course.json")}
  end

  def render("show.json", %{course: course}) do
    %{data: render_one(course, CourseView, "course.json")}
  end

  def render("course.json", %{course: course}) do
    university = Studor.Universities.get_university!(course.university_id)
    %{id: course.id,
      course_no: course.course_no,
      course_name: course.course_name,
      university_id: university.id
    }
  end
end
