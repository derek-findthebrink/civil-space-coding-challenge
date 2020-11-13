require 'rails_helper'

describe Types::ArticleType do
  subject { described_class }

  describe 'fields' do
    it { is_expected.to have_field(:id).of_type('ID!') }
    it { is_expected.to have_field(:title).of_type('String') }
    it { is_expected.to have_field(:image_url).of_type('String') }
    it { is_expected.to have_field(:body).of_type('String') }
    it { is_expected.to have_field(:created_at).of_type('ISO8601DateTime!') }
    it { is_expected.to have_field(:author).of_type('Author!') }
  end
end
