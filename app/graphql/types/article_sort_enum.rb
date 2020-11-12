module Types
  class ArticleSortEnum < Types::BaseEnum
    value "LATEST", "Sort by created at date, descending"
    value "TITLE", "Sort by title, ascending"
  end
end
