defmodule StudorWeb.PageController do
  use StudorWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
