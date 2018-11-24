defmodule Studor.Whiteboard do
    defstruct lines: [], points: []

# A Whiteboard is a map with:
#  - lines: List<List<Num>> - Lines drawn so far.
#  - points: List<Num> - Points added to current line.

    def new(active_user) do
        %{active: active_user, lines: [], points: []}
    end

    def client_view(whiteboard) do
        whiteboard
    end

    def add_point(whiteboard, x, y) do
        %{ whiteboard | points: ([%{x: x, y: y, color: "black"}] ++ whiteboard.points) }
    end

    def add_erase_point(whiteboard, x, y) do
        %{ whiteboard | points: ([%{x: x, y: y, color: "white"}] ++ whiteboard.points) }
    end

    def line_done(whiteboard) do
        %{ whiteboard | lines: [%{points: whiteboard.points, color: "black"} | whiteboard.lines], points: [] }
    end

    def erase_line_done(whiteboard) do
        %{ whiteboard | lines: [%{points: whiteboard.points, color: "white"} | whiteboard.lines], points: [] }
    end    

    def clear(whiteboard) do
        %{ whiteboard | lines: [], points: [] }
    end
end
  