defmodule StudorWeb.StudentView do
  use StudorWeb, :view
  alias StudorWeb.StudentView

  def render("index.json", %{students: students}) do
    %{data: render_many(students, StudentView, "student.json")}
  end

  def render("show.json", %{student: student}) do
    %{data: render_one(student, StudentView, "student.json")}
  end

  def render("student.json", %{student: student}) do
    %{id: student.id,
      name: student.name,
      email: student.email,
      profile_pic_url: student.profile_pic_url,
      user_type: "STUDENT"}
  end
end
