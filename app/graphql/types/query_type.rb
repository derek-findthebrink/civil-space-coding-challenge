module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :articles, [Types::ArticleType], null: true

    def articles
      Article.all
    end
  end
end
