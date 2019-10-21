Rails.application.routes.draw do

  post "/api/v1/login", to: "api/v1/sessions#create"
  post "/api/v1/signup", to: "api/v1/users#create"
  post "/api/v1/create_doctor", to: "api/v1/doctors#create"
  delete "/api/v1/logout", to: "api/v1/sessions#destroy"
  get "/api/v1/get_current_user", to: "api/v1/sessions#get_current_user"

  namespace :api do 
    namespace :v1 do 
      resources :doctors, :only => [:show, :create, :update, :destroy]
      resources :users, :only => [:show, :create, :update, :destroy]
      
    end 
  end 
  
end
