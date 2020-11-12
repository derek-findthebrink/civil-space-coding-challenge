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

CREATED_AT_DATES = [
  DateTime.now,
  DateTime.now - 2.year,
  DateTime.now - 4.year,
  DateTime.now - 6.year
]

# Vary created_at dates
Article.all.each do |article|
  article.created_at = CREATED_AT_DATES.sample
  article.save!
end

puts 'Seed complete.'
