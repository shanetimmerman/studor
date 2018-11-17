defmodule StudorWeb.UniversityView do
  use StudorWeb, :view
  alias StudorWeb.UniversityView

  def render("index.json", %{universities: universities}) do
    %{data: render_many(universities, UniversityView, "university.json")}
  end

  def render("show.json", %{university: university}) do
    %{data: render_one(university, UniversityView, "university.json")}
  end

  def render("university.json", %{university: university}) do
    %{id: university.id,
      name: university.name}
  end
end
