defmodule Studor.TutorAvailabilitiesTest do
  use Studor.DataCase

  alias Studor.TutorAvailabilities

  describe "tutor_availabilities" do
    alias Studor.TutorAvailabilities.TutorAvailability

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def tutor_availability_fixture(attrs \\ %{}) do
      {:ok, tutor_availability} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TutorAvailabilities.create_tutor_availability()

      tutor_availability
    end

    test "list_tutor_availabilities/0 returns all tutor_availabilities" do
      tutor_availability = tutor_availability_fixture()
      assert TutorAvailabilities.list_tutor_availabilities() == [tutor_availability]
    end

    test "get_tutor_availability!/1 returns the tutor_availability with given id" do
      tutor_availability = tutor_availability_fixture()
      assert TutorAvailabilities.get_tutor_availability!(tutor_availability.id) == tutor_availability
    end

    test "create_tutor_availability/1 with valid data creates a tutor_availability" do
      assert {:ok, %TutorAvailability{} = tutor_availability} = TutorAvailabilities.create_tutor_availability(@valid_attrs)
    end

    test "create_tutor_availability/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TutorAvailabilities.create_tutor_availability(@invalid_attrs)
    end

    test "update_tutor_availability/2 with valid data updates the tutor_availability" do
      tutor_availability = tutor_availability_fixture()
      assert {:ok, %TutorAvailability{} = tutor_availability} = TutorAvailabilities.update_tutor_availability(tutor_availability, @update_attrs)
    end

    test "update_tutor_availability/2 with invalid data returns error changeset" do
      tutor_availability = tutor_availability_fixture()
      assert {:error, %Ecto.Changeset{}} = TutorAvailabilities.update_tutor_availability(tutor_availability, @invalid_attrs)
      assert tutor_availability == TutorAvailabilities.get_tutor_availability!(tutor_availability.id)
    end

    test "delete_tutor_availability/1 deletes the tutor_availability" do
      tutor_availability = tutor_availability_fixture()
      assert {:ok, %TutorAvailability{}} = TutorAvailabilities.delete_tutor_availability(tutor_availability)
      assert_raise Ecto.NoResultsError, fn -> TutorAvailabilities.get_tutor_availability!(tutor_availability.id) end
    end

    test "change_tutor_availability/1 returns a tutor_availability changeset" do
      tutor_availability = tutor_availability_fixture()
      assert %Ecto.Changeset{} = TutorAvailabilities.change_tutor_availability(tutor_availability)
    end
  end
end
