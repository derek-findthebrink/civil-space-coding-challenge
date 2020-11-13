require 'rails_helper'

RSpec.describe CivilspaceChallengeSchema, type: :graphql do
  # Helpers
  # ----------------------------------------------------------------------------
  # TODO: move these to their own module
  def execute_query(query, variables, **kwargs)
    CivilspaceChallengeSchema.execute(
      query,
      {
        context: {},
        variables: variables
      }.merge(kwargs)
    )
  end

  def fetch_query(query)
    file = File.open("spec/support/graphql-queries/#{query}.graphql")
    value = file.read
    file.close
    value
  end

  # Tests
  # ----------------------------------------------------------------------------
  it 'matches the dumped schema (rails graphql:schema:dump)' do
    context = { GRAPHQL_RAKE_TASK: true }

    aggregate_failures do
      expect(described_class.to_definition(context: context)).to eq(File.read(Rails.root.join('schema.graphql')))
      expect(described_class.to_json(context: context)).to eq(File.read(Rails.root.join('schema.json')))
    end
  end

  describe 'integration tests' do
    describe 'Query' do
      describe 'articles' do
        let(:query) { fetch_query('articles') }
        let(:title_contains) { nil }
        let(:sort_by) { nil }
        let(:variables) { { titleContains: title_contains, sortBy: sort_by } }
        let(:response) { execute_query(query, variables) }
        let(:response_articles) { response['data']['articles'] }
        let(:response_article_ids_map) { response_articles.map { |x| x['id'] } }

        before do
          create_list(:article,  5)
          Article.all.each_with_index do |article, i|
            article.created_at = article.created_at - i.years
            article.save!
          end
        end

        context 'when there are neither filter nor order arguments passed' do
          let(:expected) { Article.all.map { |x| x.id.to_s  } }

          it 'returns all articles' do
            expect(response_articles.length).to eq(expected.count)
            expect(response_article_ids_map).to eq(expected)
          end
        end

        context 'when filtering arguments are passed' do
          context 'when filtering by title' do
            let(:title_contains) { SecureRandom.alphanumeric }

            context 'one article contains the expected text' do
              let!(:article) { create(:article, title: "awefasd#{title_contains}awecasd awe") }

              it 'returns only the article that have a title that contains the expected text' do
                expect(response_articles.length).to eq(1)
                expect(response_articles.first['id']).to eq(article.id.to_s)
              end
            end

            context 'more than one article contains the expected text' do
              let(:count) { 5 }
              let!(:articles) do
                create_list(:article, count) do |article, i|
                  article.title = "awefasd#{title_contains}awecasd awe #{i} #{SecureRandom.alphanumeric}"
                  article.save!
                end
              end

              it 'returns only the articles that have a title that contains the expected text' do
                expect(response_articles.length).to eq(count)
                expect(response_articles.map {|x| x['id']}).to eq(articles.map {|x| x.id.to_s})
              end
            end
          end
        end

        context 'when ordering arguments are passed' do
          context 'when ordering by LATEST' do
            let(:sort_by) { 'LATEST' }
            let(:expected) { Article.all.order('created_at DESC' ).map {|x| x.created_at.iso8601 } }
            let(:created_at_map) { response['data']['articles'].map {|x| x['createdAt'] } }

            it 'returns the articles reverse chronological order' do
              expect(created_at_map).to eq(expected)
            end
          end

          context 'when ordering by TITLE' do
            let(:sort_by) { 'TITLE' }
            let(:expected) { Article.all.order('title ASC' ).map {|x| x.id.to_s } }
            let(:id_map) { response['data']['articles'].map {|x| x['id'] } }

            it 'returns the articles in alphabetic-order by title' do
              expect(id_map).to eq(expected)
            end
          end
        end
      end

      describe 'article' do
        let(:query) { fetch_query('article') }
        let(:response) { execute_query(query, variables) }
        let(:count) { 5 }
        let(:id) { Article.all.sample.id.to_s }
        let(:variables) { { id: id } }
        let(:response_article) { response['data']['article'] }
        let(:expected_article) { Article.find(id) }

        before do
          create_list(:article, count)
        end

        it 'returns the expected article' do
          expect(response_article['id']).to eq(expected_article.id.to_s)
        end
      end
    end
  end
end
