# frozen_string_literal: true
5.times do
  Author.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name
  )
end 

15.times do
  Article.create!(
    title: Faker::Book.title,
    introduction: Faker::Lorem.paragraph(sentence_count: 10),
    body: Faker::Lorem.paragraph(sentence_count: 75),
    author: Author.all.sample,
    image_url: Faker::LoremPixel.image(size: '1500x600')
  )
end
