Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  mount ActionCable.server => "/cable"

  # Defines the root path route ("/")
  # root "posts#index"

  get "api/documents/:user_id", to: "document#index", as: :documents
  post "api/documents", to: "document#create", as: :documents_create
  patch "api/documents/:id", to: "document#update", as: :documents_update
  delete "api/documents/:id", to: "document#destroy", as: :documents_destroy

  get "api/invites/:user_id", to: "invite#index", as: :invites
  post "api/invites", to: "invite#create", as: :invites_create
  patch "api/invites/:id", to: "invite#update", as: :invites_update
  delete "api/invites/:id", to: "invite#destroy", as: :invites_destroy

  get "api/shares/:user_id", to: "share#index", as: :shares
end
