defmodule StudorWeb.AvailabilityController do
  use StudorWeb, :controller

  alias Studor.Availabilities
  alias Studor.Availabilities.Availability

  action_fallback StudorWeb.FallbackController

  def index(conn, _params) do
    availabilities = Availabilities.list_availabilities()
    render(conn, "index.json", availabilities: availabilities)
  end

  def create(conn, %{"availability" => availability_params}) do
    with {:ok, %Availability{} = availability} <- Availabilities.create_availability(availability_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.availability_path(conn, :show, availability))
      |> render("show.json", availability: availability)
    end
  end

  def show(conn, %{"id" => id}) do
    availability = Availabilities.get_availability!(id)
    render(conn, "show.json", availability: availability)
  end

  def update(conn, %{"id" => id, "availability" => availability_params}) do
    availability = Availabilities.get_availability!(id)

    with {:ok, %Availability{} = availability} <- Availabilities.update_availability(availability, availability_params) do
      render(conn, "show.json", availability: availability)
    end
  end

  def delete(conn, %{"id" => id}) do
    availability = Availabilities.get_availability!(id)

    with {:ok, %Availability{}} <- Availabilities.delete_availability(availability) do
      send_resp(conn, :no_content, "")
    end
  end
end
