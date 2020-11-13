module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :articles, [Types::ArticleType], null: true, resolver: Resolvers::Articles
    field :article, Types::ArticleType, null: true do
      description "Find an article by ID"
      argument :article_id, String, required: true
    end

    def article(article_id:)
      Article.find(article_id)
    end
  end
end
