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
    option :order, type: Types::ArticleSortEnum, with: :apply_sort


    private

      def apply_filter(scope, value)
        branches = normalize_filters(value).reduce { |a, b| a.or(b) }
        scope.merge branches
      end

      def apply_sort(scope, value)
        branches = normalize_sort(value).reduce { |a, b| a.or(b) }
        scope.merge branches
      end

      def normalize_sort(value, branches = [])
        scope = Article.all
        scope = scope.order 'created_at DESC' if value == 'LATEST'
        scope = scope.order 'title ASC' if value == 'TITLE'

        branches << scope

        branches
      end

      def normalize_filters(value, branches = [])
        scope = Article.all
        scope = scope.where('lower(title) LIKE ?', "%#{value[:title_contains].downcase}%") if value[:title_contains]

        branches << scope

        branches
      end
  end
end
