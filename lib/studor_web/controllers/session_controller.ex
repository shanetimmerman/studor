defmodule StudorWeb.SessionController do
    use StudorWeb, :controller
  
    action_fallback StudorWeb.FallbackController
  
    alias Studor.Students.Student
    alias Studor.Tutors.Tutor
  
    def create(conn, %{"email" => email, "password" => password, "user_type" => user_type}) do
        case user_type do 
            "STUDENT" -> send_create(conn, Studor.Students.get_and_auth_user(email, password), %Student{}, user_type)
            "TUTOR" -> send_create(conn, Studor.Tutors.get_and_auth_user(email, password), %Tutor{}, user_type)
            _ -> :error
        end
    end

    def send_create(conn, user, struct, user_type) do
        # Unauthorized, send 401
        if user == nil do
            conn
            |> send_resp(401, "Invalid username or password. Please try again!")
            |> halt()
        else
        
            # Authorized, return the correct data
        with struct = user do
            resp = %{
                data: %{
                    token: Phoenix.Token.sign(StudorWeb.Endpoint, "user_id", user.id),
                    user_id: user.id,
                    user_type: user_type,
                }
            }
    
            conn
            |> put_resp_header("content-type", "application/json; charset=utf-8")
            |> send_resp(:created, Jason.encode!(resp))
        end
    end
    end
end

