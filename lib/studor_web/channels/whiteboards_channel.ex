defmodule StudorWeb.WhiteboardsChannel do
    use StudorWeb, :channel
  
    alias Studor.Whiteboard
    alias Studor.BackupAgent
  
    def join("whiteboards:" <> session_id, payload, socket) do
      if authorized?(payload) do
        whiteboard = BackupAgent.get(session_id) || Whiteboard.new()
        socket = socket
        |> assign(:whiteboard, whiteboard)
        |> assign(:session_id, session_id)
        BackupAgent.put(session_id, whiteboard)
        {:ok, %{"join" => session_id, "whiteboard" => Whiteboard.client_view(whiteboard)}, socket}
      else
        {:error, %{reason: "unauthorized"}}
      end
    end
  
    def handle_in("add_point", %{"x" => x, "y" => y}, socket) do
      id = socket.assigns[:session_id]
      whiteboard = Whiteboard.add_point(socket.assigns[:whiteboard], x, y)
      socket = assign(socket, :whiteboard, whiteboard)
      BackupAgent.put(id, whiteboard)
      {:reply, {:ok, %{ "whiteboard" => Whiteboard.client_view(whiteboard)}}, socket}
    end
  
    def handle_in("line_done", %{}, socket) do
      id = socket.assigns[:session_id]
      whiteboard = Whiteboard.line_done(socket.assigns[:whiteboard])
      socket = assign(socket, :whiteboard, whiteboard)
      BackupAgent.put(id, whiteboard)
      {:reply, {:ok, %{ "whiteboard" => Whiteboard.client_view(whiteboard)}}, socket}
    end

    def handle_in("clear", %{}, socket) do
      id = socket.assigns[:session_id]
      whiteboard = Whiteboard.clear(socket.assigns[:whiteboard])
      socket = assign(socket, :whiteboard, whiteboard)
      BackupAgent.put(id, whiteboard)
      {:reply, {:ok, %{ "whiteboard" => Whiteboard.client_view(whiteboard)}}, socket}
    end
  
    # Add authorization logic here as required.
    defp authorized?(_payload) do
      true
    end
  end
  