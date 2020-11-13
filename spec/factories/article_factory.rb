FactoryBot.define do
  factory :article do
    title { Faker::Book.title }
    introduction { Faker::Lorem.paragraph(sentence_count: 10) }
    body { Faker::Lorem.paragraph(sentence_count: 75) }
    image_url { Faker::LoremPixel.image(size: '1500x600') }
    author
  end
end
