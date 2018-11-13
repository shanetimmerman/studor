defmodule StudorWeb.TutorView do
  use StudorWeb, :view
  alias StudorWeb.TutorView

  def render("index.json", %{tutors: tutors}) do
    %{data: render_many(tutors, TutorView, "tutor.json")}
  end

  def render("show.json", %{tutor: tutor}) do
    %{data: render_one(tutor, TutorView, "tutor.json")}
  end

  def render("tutor.json", %{tutor: tutor}) do
    %{id: tutor.id,
      email: tutor.email,
      password_hash: tutor.password_hash,
      paypal_token: tutor.paypal_token,
      profile_pic_url: tutor.profile_pic_url,
      gpa: tutor.gpa}
  end
end
