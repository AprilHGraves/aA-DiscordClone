Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resources :servers, only: [:index, :create, :update, :destroy]
    resources :server_memberships, only: [:index, :create, :update, :destroy]
    resources :channels, only: [:index, :create, :update, :destroy]
    resources :server_invites, only: [:index, :show, :create, :update, :destroy]
    resources :messages, only: [:index, :show, :create, :update, :destroy]
    resources :dm_conversations, only: [:index, :create]
    resources :dm_memberships, only: [:create]
  end
end
