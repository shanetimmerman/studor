defmodule Studor.TutorSubjectAreasTest do
  use Studor.DataCase

  alias Studor.TutorSubjectAreas

  describe "tutor_subject_areas" do
    alias Studor.TutorSubjectAreas.TutorSubjectArea

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def tutor_subject_area_fixture(attrs \\ %{}) do
      {:ok, tutor_subject_area} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TutorSubjectAreas.create_tutor_subject_area()

      tutor_subject_area
    end

    test "list_tutor_subject_areas/0 returns all tutor_subject_areas" do
      tutor_subject_area = tutor_subject_area_fixture()
      assert TutorSubjectAreas.list_tutor_subject_areas() == [tutor_subject_area]
    end

    test "get_tutor_subject_area!/1 returns the tutor_subject_area with given id" do
      tutor_subject_area = tutor_subject_area_fixture()
      assert TutorSubjectAreas.get_tutor_subject_area!(tutor_subject_area.id) == tutor_subject_area
    end

    test "create_tutor_subject_area/1 with valid data creates a tutor_subject_area" do
      assert {:ok, %TutorSubjectArea{} = tutor_subject_area} = TutorSubjectAreas.create_tutor_subject_area(@valid_attrs)
    end

    test "create_tutor_subject_area/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TutorSubjectAreas.create_tutor_subject_area(@invalid_attrs)
    end

    test "update_tutor_subject_area/2 with valid data updates the tutor_subject_area" do
      tutor_subject_area = tutor_subject_area_fixture()
      assert {:ok, %TutorSubjectArea{} = tutor_subject_area} = TutorSubjectAreas.update_tutor_subject_area(tutor_subject_area, @update_attrs)
    end

    test "update_tutor_subject_area/2 with invalid data returns error changeset" do
      tutor_subject_area = tutor_subject_area_fixture()
      assert {:error, %Ecto.Changeset{}} = TutorSubjectAreas.update_tutor_subject_area(tutor_subject_area, @invalid_attrs)
      assert tutor_subject_area == TutorSubjectAreas.get_tutor_subject_area!(tutor_subject_area.id)
    end

    test "delete_tutor_subject_area/1 deletes the tutor_subject_area" do
      tutor_subject_area = tutor_subject_area_fixture()
      assert {:ok, %TutorSubjectArea{}} = TutorSubjectAreas.delete_tutor_subject_area(tutor_subject_area)
      assert_raise Ecto.NoResultsError, fn -> TutorSubjectAreas.get_tutor_subject_area!(tutor_subject_area.id) end
    end

    test "change_tutor_subject_area/1 returns a tutor_subject_area changeset" do
      tutor_subject_area = tutor_subject_area_fixture()
      assert %Ecto.Changeset{} = TutorSubjectAreas.change_tutor_subject_area(tutor_subject_area)
    end
  end
end
