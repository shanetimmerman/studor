defmodule Studor.BackupAgent do
  use Agent

  # This is basically just a global mutable map.
  # TODO: Add timestamps and expiration.

  def start_link(_args) do
    Agent.start_link(fn -> %{} end, id: __MODULE__)
  end

  def put(id, whiteboard) do
    Agent.update __MODULE__, fn state ->
      Map.put(state, id, whiteboard)
    end
  end

  def get(id) do
    Agent.get __MODULE__, fn state ->
      Map.get(state, id)
    end
  end
end
