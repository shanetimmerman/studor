defmodule StudorWeb.TutorSubjectAreaView do
  use StudorWeb, :view
  alias StudorWeb.TutorSubjectAreaView

  def render("index.json", %{tutor_subject_areas: tutor_subject_areas}) do
    %{data: render_many(tutor_subject_areas, TutorSubjectAreaView, "tutor_subject_area.json")}
  end

  def render("show.json", %{tutor_subject_area: tutor_subject_area}) do
    %{data: render_one(tutor_subject_area, TutorSubjectAreaView, "tutor_subject_area.json")}
  end

  def render("tutor_subject_area.json", %{tutor_subject_area: tutor_subject_area}) do
    %{id: tutor_subject_area.id}
  end
end
