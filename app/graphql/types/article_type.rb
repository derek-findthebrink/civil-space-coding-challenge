module Types
  class ArticleType < Types::BaseObject
    description 'Well, its an article!'

    field :id, ID, 'The ID of the article', null: false
    field :title, String, 'The title of the article', null: true
    field :image_url, String, 'The URL of the image attached to the article', null: true
    field :introduction, String, 'The start of the article', null: true
    field :body, String, 'The main part of the article', null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, 'The date that the article was created on', null: false
    # TODO: consider using lookahead here to optimize query
    field :author, Types::AuthorType, 'The person who wrote the article', null: false
  end
end
