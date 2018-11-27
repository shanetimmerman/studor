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
    university = Studor.Universities.get_university!(tutor.university_id)
    num_ratings = length(Studor.Ratings.get(tutor.id))
    avg_rating = Studor.Tutors.average_rating(tutor.id)
    subject_areas = Studor.Tutors.get_subject_areas(tutor.id)
    course_names = Studor.Tutors.get_courses(tutor.id)
    availability = Studor.Tutors.get_availability(tutor.id)
   
    %{id: tutor.id,
      email: tutor.email,
      name: tutor.name,
      bio: tutor.bio,
      university: %{name: university.name, id: university.id},
      gpa: tutor.gpa,
      courses: course_names,
      subject_areas: subject_areas,
      availabilities: availability,
      profile_pic_url: tutor.profile_pic_url,
      average_rating: avg_rating,
      num_ratings: num_ratings,
      paypal_email: tutor.paypal_email,
      user_type: "TUTOR"}
  end
end
