defmodule StudorWeb.SubjectView do
  use StudorWeb, :view
  alias StudorWeb.SubjectView

  def render("index.json", %{subjects: subjects}) do
    %{data: render_many(subjects, SubjectView, "subject.json")}
  end

  def render("show.json", %{subject: subject}) do
    %{data: render_one(subject, SubjectView, "subject.json")}
  end

  def render("subject.json", %{subject: subject}) do
    %{id: subject.id,
      subject: subject.subject}
  end
end
