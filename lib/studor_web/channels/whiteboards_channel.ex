defmodule StudorWeb.WhiteboardsChannel do
    use StudorWeb, :channel
  
    alias Studor.Whiteboard
    alias Studor.BackupAgent
  
    def join("whiteboards:" <> session_id, %{"active" => tutor_id}, socket) do
        whiteboard = BackupAgent.get(session_id) || Whiteboard.new(tutor_id)
        socket = socket
        |> assign(:whiteboard, whiteboard)
        |> assign(:name, session_id)
        BackupAgent.put(session_id, whiteboard)
        {:ok, %{"join" => session_id, "whiteboard" => Whiteboard.client_view(whiteboard)}, socket}
    end

    def handle_in("draw", %{"x" => x, "y" => y}, socket) do
      id = socket.assigns[:name]
      whiteboard = BackupAgent.get(id)
      if socket.assigns[:user] == whiteboard.active do
        whiteboard1 = Whiteboard.add_point(socket.assigns[:whiteboard], x, y)
        socket = assign(socket, :whiteboard, whiteboard1)
        BackupAgent.put(id, whiteboard1)
        {:reply, {:ok, %{ "whiteboard" => Whiteboard.client_view(whiteboard1)}}, socket}
      else
        broadcast(socket, "draw", %{x: x, y: y})
        IO.puts "draw broadcast"
      end
      {:noreply, socket}
    end

    def handle_in("line_done", %{"points" => points}, socket) do
      id = socket.assigns[:name]
      whiteboard = BackupAgent.get(id)
      if socket.assigns[:user] == whiteboard.active do
        whiteboard1 = Whiteboard.line_done(socket.assigns[:whiteboard])
        socket = assign(socket, :whiteboard, whiteboard1)
        BackupAgent.put(id, whiteboard1)
        {:reply, {:ok, %{ "whiteboard" => Whiteboard.client_view(whiteboard1)}}, socket}
      else
        broadcast(socket, "line_done", %{points: points})
      end
      {:noreply, socket}
    end
  
    def handle_in("clear", _payload, socket) do
      id = socket.assigns[:name]
      whiteboard = BackupAgent.get(id)
      if socket.assigns[:user] == whiteboard.active do
        whiteboard1 = Whiteboard.clear(socket.assigns[:whiteboard])
        socket = assign(socket, :whiteboard, whiteboard1)
        BackupAgent.put(id, whiteboard1)
        {:reply, {:ok, %{ "whiteboard" => Whiteboard.client_view(whiteboard1)}}, socket}
      else
        broadcast(socket, "clear", %{})
      end
      {:noreply, socket}
    end
  
    # Add authorization logic here as required.
    defp authorized?(_payload) do
      true
    end
  end
  