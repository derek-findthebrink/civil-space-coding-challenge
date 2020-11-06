class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :introduction
      t.text :body
      t.string :image_url
      t.references :author, null: false, foreign_key: true

      t.timestamps
    end
  end
end
