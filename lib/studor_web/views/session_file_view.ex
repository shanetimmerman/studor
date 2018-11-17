defmodule StudorWeb.SessionFileView do
  use StudorWeb, :view
  alias StudorWeb.SessionFileView

  def render("index.json", %{session_files: session_files}) do
    %{data: render_many(session_files, SessionFileView, "session_file.json")}
  end

  def render("show.json", %{session_file: session_file}) do
    %{data: render_one(session_file, SessionFileView, "session_file.json")}
  end

  def render("session_file.json", %{session_file: session_file}) do
    %{id: session_file.id,
      file_url: session_file.file_url}
  end
end
