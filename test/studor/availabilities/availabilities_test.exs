defmodule Studor.AvailabilitiesTest do
  use Studor.DataCase

  alias Studor.Availabilities

  describe "availabilities" do
    alias Studor.Availabilities.Availability

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def availability_fixture(attrs \\ %{}) do
      {:ok, availability} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Availabilities.create_availability()

      availability
    end

    test "list_availabilities/0 returns all availabilities" do
      availability = availability_fixture()
      assert Availabilities.list_availabilities() == [availability]
    end

    test "get_availability!/1 returns the availability with given id" do
      availability = availability_fixture()
      assert Availabilities.get_availability!(availability.id) == availability
    end

    test "create_availability/1 with valid data creates a availability" do
      assert {:ok, %Availability{} = availability} = Availabilities.create_availability(@valid_attrs)
    end

    test "create_availability/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Availabilities.create_availability(@invalid_attrs)
    end

    test "update_availability/2 with valid data updates the availability" do
      availability = availability_fixture()
      assert {:ok, %Availability{} = availability} = Availabilities.update_availability(availability, @update_attrs)
    end

    test "update_availability/2 with invalid data returns error changeset" do
      availability = availability_fixture()
      assert {:error, %Ecto.Changeset{}} = Availabilities.update_availability(availability, @invalid_attrs)
      assert availability == Availabilities.get_availability!(availability.id)
    end

    test "delete_availability/1 deletes the availability" do
      availability = availability_fixture()
      assert {:ok, %Availability{}} = Availabilities.delete_availability(availability)
      assert_raise Ecto.NoResultsError, fn -> Availabilities.get_availability!(availability.id) end
    end

    test "change_availability/1 returns a availability changeset" do
      availability = availability_fixture()
      assert %Ecto.Changeset{} = Availabilities.change_availability(availability)
    end
  end
end
