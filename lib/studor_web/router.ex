defmodule StudorWeb.Router do
  use StudorWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", StudorWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api/v1", StudorWeb do
    pipe_through :api
    resources "/subjects", SubjectController, except: [:new, :edit]
    resources "/universities", UniversityController, except: [:new, :edit]
    resources "/time_blocks", TimeBlockController, except: [:new, :edit]
    resources "/students", StudentController, except: [:new, :edit]
    resources "/tutors", TutorController, except: [:new, :edit]
    resources "/courses", CourseController, except: [:new, :edit]
    resources "/subject_areas", SubjectAreaController, except: [:new, :edit]
    resources "/tutoring_sessions", TutoringSessionController, except: [:new, :edit]
    resources "/session_files", SessionFileController, except: [:new, :edit]
    resources "/ratings", RatingController, except: [:new, :edit]
  end
end
