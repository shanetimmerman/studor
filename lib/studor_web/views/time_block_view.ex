defmodule StudorWeb.TimeBlockView do
  use StudorWeb, :view
  alias StudorWeb.TimeBlockView

  def render("index.json", %{time_blocks: time_blocks}) do
    %{data: render_many(time_blocks, TimeBlockView, "time_block.json")}
  end

  def render("show.json", %{time_block: time_block}) do
    %{data: render_one(time_block, TimeBlockView, "time_block.json")}
  end

  def render("time_block.json", %{time_block: time_block}) do
    %{id: time_block.id,
      start_time: time_block.start_time,
      end_time: time_block.end_time}
  end
end
