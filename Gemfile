source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'
gem 'rails', '~> 6.0.0.rc1'
gem 'haml-rails', '~> 2.0'
gem 'faker'
gem "graphql", "~> 1.9"
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'webpacker', '~> 4.0'
gem 'jbuilder', '~> 2.5'
gem 'bootsnap', '>= 1.4.6', require: false

gem 'search_object_graphql', '0.3.1'
gem 'dotenv-rails'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'rspec-rails'
  gem 'rails-controller-testing'
  gem 'factory_bot_rails'
  gem 'rspec-graphql_matchers'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'guard-rspec', '~> 4.7.3', require: false
end

group :test do
  gem 'simplecov', require: false
  gem 'shoulda-matchers', '~> 4.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]


gem 'graphiql-rails', group: :development
