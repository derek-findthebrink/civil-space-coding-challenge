require 'rails_helper'

describe Types::QueryType do
  subject { described_class }

  describe 'fields' do
    # TODO: fix this type, it isn't behaving as expected (it should be [Article])
    it { is_expected.to have_field(:articles).of_type('[Article!]') }
    it { is_expected.to have_field(:article).of_type('Article') }
  end

  describe 'articles' do
    subject { described_class.fields['articles'] }

    it 'resolves using Resolvers::Articles'
  end

  describe 'article' do
    subject { described_class.fields['article'] }

    it 'accepts an argument of :article_id'
  end
end
