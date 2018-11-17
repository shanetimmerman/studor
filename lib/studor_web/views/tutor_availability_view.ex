defmodule StudorWeb.TutorAvailabilityView do
  use StudorWeb, :view
  alias StudorWeb.TutorAvailabilityView

  def render("index.json", %{tutor_availabilities: tutor_availabilities}) do
    %{data: render_many(tutor_availabilities, TutorAvailabilityView, "tutor_availability.json")}
  end

  def render("show.json", %{tutor_availability: tutor_availability}) do
    %{data: render_one(tutor_availability, TutorAvailabilityView, "tutor_availability.json")}
  end

  def render("tutor_availability.json", %{tutor_availability: tutor_availability}) do
    %{id: tutor_availability.id}
  end
end
