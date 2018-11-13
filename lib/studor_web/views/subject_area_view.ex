defmodule StudorWeb.SubjectAreaView do
  use StudorWeb, :view
  alias StudorWeb.SubjectAreaView

  def render("index.json", %{subject_areas: subject_areas}) do
    %{data: render_many(subject_areas, SubjectAreaView, "subject_area.json")}
  end

  def render("show.json", %{subject_area: subject_area}) do
    %{data: render_one(subject_area, SubjectAreaView, "subject_area.json")}
  end

  def render("subject_area.json", %{subject_area: subject_area}) do
    %{id: subject_area.id,
      subject_area: subject_area.subject_area}
  end
end
