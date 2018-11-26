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

  scope "/api/v1", StudorWeb do
    pipe_through :api
    get "/tutors/subject_areas/:subject_area_id", TutorController, :subject_index
    get "/tutors/:university_id/:query", TutorController, :course_index
    get "/universities", UniversityController, :index
    post "/session_files/:files", SessionFileController, :post_files
    resources "/sessions", SessionController, only: [:create]
    resources "/subjects", SubjectController, except: [:new, :edit]
    resources "/universities", UniversityController
    resources "/time_blocks", TimeBlockController, except: [:new, :edit]
    resources "/students", StudentController, except: [:new, :edit]
    resources "/tutors", TutorController, except: [:new, :edit]
    resources "/courses", CourseController, except: [:new, :edit]
    resources "/subject_areas", SubjectAreaController, except: [:new, :edit]
    resources "/tutoring_sessions", TutoringSessionController, except: [:edit]
    resources "/session_files", SessionFileController, except: [:new, :edit]
    resources "/ratings", RatingController, except: [:new, :edit]
    resources "/tutor_courses", TutorCourseController, except: [:new, :edit]
    resources "/tutor_subject_areas", TutorSubjectAreaController, except: [:new, :edit]
    resources "/tutor_availabilities", TutorAvailabilityController, except: [:new, :edit]
  end

  scope "/from_paypal", StudorWeb do
    pipe_through :browser
    get "/", RedirectController, :index
  end

  scope "/", StudorWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end

end
