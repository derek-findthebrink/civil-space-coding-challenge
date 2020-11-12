module Types
  class AuthorType < Types::BaseObject
    description 'A person this time!'

    field :id, ID, 'The ID of the article', null: false
    field :first_name, String, 'The author\'s first name', null: true
    field :last_name, String, 'The author\'s last name', null: true
  end
end
