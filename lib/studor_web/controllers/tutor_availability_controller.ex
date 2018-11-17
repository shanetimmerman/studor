defmodule StudorWeb.TutorAvailabilityController do
  use StudorWeb, :controller

  alias Studor.TutorAvailabilities
  alias Studor.TutorAvailabilities.TutorAvailability

  action_fallback StudorWeb.FallbackController

  def index(conn, _params) do
    tutor_availabilities = TutorAvailabilities.list_tutor_availabilities()
    render(conn, "index.json", tutor_availabilities: tutor_availabilities)
  end

  def create(conn, %{"tutor_availability" => tutor_availability_params}) do
    with {:ok, %TutorAvailability{} = tutor_availability} <- TutorAvailabilities.create_tutor_availability(tutor_availability_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.tutor_availability_path(conn, :show, tutor_availability))
      |> render("show.json", tutor_availability: tutor_availability)
    end
  end

  def show(conn, %{"id" => id}) do
    tutor_availability = TutorAvailabilities.get_tutor_availability!(id)
    render(conn, "show.json", tutor_availability: tutor_availability)
  end

  def update(conn, %{"id" => id, "tutor_availability" => tutor_availability_params}) do
    tutor_availability = TutorAvailabilities.get_tutor_availability!(id)

    with {:ok, %TutorAvailability{} = tutor_availability} <- TutorAvailabilities.update_tutor_availability(tutor_availability, tutor_availability_params) do
      render(conn, "show.json", tutor_availability: tutor_availability)
    end
  end

  def delete(conn, %{"id" => id}) do
    tutor_availability = TutorAvailabilities.get_tutor_availability!(id)

    with {:ok, %TutorAvailability{}} <- TutorAvailabilities.delete_tutor_availability(tutor_availability) do
      send_resp(conn, :no_content, "")
    end
  end
end
