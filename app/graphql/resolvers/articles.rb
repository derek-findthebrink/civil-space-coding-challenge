require 'search_object'
require 'search_object/plugin/graphql'

module Resolvers
  class Articles
    include SearchObject.module(:graphql)

    scope { Article.all }

    type [Types::ArticleType]

    class ArticleFilter < ::Types::BaseInputObject
      argument :title_contains, String, required: false
    end

    option :filter, type: ArticleFilter, with: :apply_filter

    def apply_filter(scope, value)
      branches = normalize_filters(value).reduce { |a, b| a.or(b)  }
      scope.merge branches
    end

    def normalize_filters(value, branches = [])
      scope = Article.all
      scope = scope.where('title LIKE ?', "%#{value[:title_contains]}%") if value[:title_contains]

      branches << scope

      branches
    end
  end
end
