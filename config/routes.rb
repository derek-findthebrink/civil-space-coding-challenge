Rails.application.routes.draw do
  root "pages#home"
  post "/graphql", to: "graphql#execute"
  get "/articles", to: "articles#index"
end
