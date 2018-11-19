defmodule Studor.Whiteboard do
    defstruct lines: [], points: []

# A Whiteboard is a map with:
#  - lines: List<List<Num>> - Lines drawn so far.
#  - points: List<Num> - Points added to current line.

    def new do
        %{points: [], lines: [],}
    end

    def client_view(whiteboard) do
        whiteboard
    end

    def add_point(whiteboard, x, y) do
    %Studor.Whiteboard{ whiteboard | points: ([x, y] ++ whiteboard.points) }
    end

    def line_done(whiteboard) do
    %Studor.Whiteboard{ whiteboard | lines: [whiteboard.points | whiteboard.lines], points: [] }
    end

    def clear(whiteboard) do
    %Studor.Whiteboard{ whiteboard | lines: [], points: [] }
    end
end
  