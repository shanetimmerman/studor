defmodule Studor.Repo do
  use Ecto.Repo,
    otp_app: :studor,
    adapter: Ecto.Adapters.Postgres
end
