Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql" if Rails.env.development?

  root "pages#home"
  post "/graphql", to: "graphql#execute"
  get "/articles", to: "articles#index"
end
