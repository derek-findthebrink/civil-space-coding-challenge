require 'rails_helper'

describe Types::QueryType do
  subject { described_class }

  describe 'fields' do
    it { is_expected.to have_field(:articles).of_type('[Article!]') }
    it { is_expected.to have_field(:article).of_type('Article') }

    describe 'articles' do
      subject { described_class.fields['articles'] }

      it { is_expected.to accept_argument(:order).of_type('ArticleSortEnum') }
      it { is_expected.to accept_argument(:filter).of_type('ArticleFilter') }
      it 'resolves using Resolvers::Articles' do
        expect(subject.instance_variable_get('@resolver_class')).to eq(Resolvers::Articles)
      end
    end

    describe 'article' do
      subject { described_class.fields['article'] }

      it { is_expected.to accept_argument(:article_id).of_type('String!') }
    end
  end
end
