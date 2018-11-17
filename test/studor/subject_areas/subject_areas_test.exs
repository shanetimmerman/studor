defmodule Studor.SubjectAreasTest do
  use Studor.DataCase

  alias Studor.SubjectAreas

  describe "subject_areas" do
    alias Studor.SubjectAreas.SubjectArea

    @valid_attrs %{subject_area: "some subject_area"}
    @update_attrs %{subject_area: "some updated subject_area"}
    @invalid_attrs %{subject_area: nil}

    def subject_area_fixture(attrs \\ %{}) do
      {:ok, subject_area} =
        attrs
        |> Enum.into(@valid_attrs)
        |> SubjectAreas.create_subject_area()

      subject_area
    end

    test "list_subject_areas/0 returns all subject_areas" do
      subject_area = subject_area_fixture()
      assert SubjectAreas.list_subject_areas() == [subject_area]
    end

    test "get_subject_area!/1 returns the subject_area with given id" do
      subject_area = subject_area_fixture()
      assert SubjectAreas.get_subject_area!(subject_area.id) == subject_area
    end

    test "create_subject_area/1 with valid data creates a subject_area" do
      assert {:ok, %SubjectArea{} = subject_area} = SubjectAreas.create_subject_area(@valid_attrs)
      assert subject_area.subject_area == "some subject_area"
    end

    test "create_subject_area/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = SubjectAreas.create_subject_area(@invalid_attrs)
    end

    test "update_subject_area/2 with valid data updates the subject_area" do
      subject_area = subject_area_fixture()
      assert {:ok, %SubjectArea{} = subject_area} = SubjectAreas.update_subject_area(subject_area, @update_attrs)
      assert subject_area.subject_area == "some updated subject_area"
    end

    test "update_subject_area/2 with invalid data returns error changeset" do
      subject_area = subject_area_fixture()
      assert {:error, %Ecto.Changeset{}} = SubjectAreas.update_subject_area(subject_area, @invalid_attrs)
      assert subject_area == SubjectAreas.get_subject_area!(subject_area.id)
    end

    test "delete_subject_area/1 deletes the subject_area" do
      subject_area = subject_area_fixture()
      assert {:ok, %SubjectArea{}} = SubjectAreas.delete_subject_area(subject_area)
      assert_raise Ecto.NoResultsError, fn -> SubjectAreas.get_subject_area!(subject_area.id) end
    end

    test "change_subject_area/1 returns a subject_area changeset" do
      subject_area = subject_area_fixture()
      assert %Ecto.Changeset{} = SubjectAreas.change_subject_area(subject_area)
    end
  end
end
