# Civil Space Coding Challenge

[![N|Solid](https://i.ibb.co/LJs1mqj/Screen-Shot-2020-10-29-at-11-31-02-AM.png)](https://civilspace.io/)

Thank you for your interest in working with Civil Space!

To get an idea of how you work, we’d like you to build a page to display some articles with text and images using React, Ruby on Rails, as well as any other libraries, UI frameworks, and boilerplates you’re comfortable with. There’s no time limit on this exercise, but ideally **it shouldn’t take longer than a few hours**.

There’s no right or wrong answer to this challenge, but you should try to include all of the required features listed below. Features are listed by priority, and **if you’re unable to finish all of them due to time constraints, please submit your response anyway**.

Everyone at Civil Space cares about usability and accessibility, so your application should be easy to use, demonstrate accessibility best practices, and work in all modern browsers.

## Specifications

Take some time to explore. This application already has a few things set up that you'll need, including Apollo for handling GraphQL requests on the React side of things, and the rails-graphql gem for resolving queries. The goal is to fetch a list of 'articles' from Rails and display those in React at the `/articles` route. We've included a design for the article listing page, so do your best to match it. For any other pages, it's up to you, but don't worry, we don't expect you to be a designer. As a side note, given the scale of this application, not every requirement may make sense in a real world scenario. The goal here is to see what you can do.

## Requirements

- When users navigate to the `/articles` route, a list of article should be displayed matching the designs (ignore the search bar and sorting options unless you're completing the relevant bonus objectives)
- Articles should be fetched from Rails using GraphQL
- Each article should display the title, introduction, image, author, and the date the article was created
- When articles are clicked (Read More), a new tab should be opened displaying the `body` of the article
- Build your components using modern React, including 'hooks' based components

## Bonus Objectives

- Make the articles searchable by title
- Make the articles sortable by various criteria like created date or title
- Use a state management library such as Redux
- Add unit tests! We like RSpec, Jest, and React Testing Library
- Dockerize your application (use a dockerfile and docker-compose)

## Your Deliverable

Provide us with a git repository URL containing your code. We'll be looking at your commit habits as well, so keep that in mind. Please document any steps needed to get your application working in a README (or add to the bottom of this README) file in the root of your project. Your code will be evaluated on a Mac or Linux machine, so there’s no need to include Windows-specific setup instructions.

Good luck and happy hacking!

## Designs

Designs are available here: https://projects.invisionapp.com/share/TSZ7XUWAQ6J#/screens/435810220_cs-Newsfeed

Fonts can be found in `frontend/fonts`

## Environment Setup

- Recommended Node version: `>=12.5.0`
- Recommended Ruby version: `>=2.7.1`
- Recommended NPM version: `>=6.9.0`
- Recommended PostgresQL version: `>=12.0`

After cloning the repository, install the project dependencies:

```
$ npm install
$ bin/bundle install
```

Set up your PostgresQL database and seed data:

```
$ bin/rails db:setup
```

You should now be able to run both Rails and React:

```
$ bin/rails s
$ bin/webpack-dev-server
```

## Suggested Reading

Here are a couple helpful articles that inspired some of the setup for this application:

- [Frontend Setup](https://evilmartians.com/chronicles/evil-front-part-1)
- [GraphQL](https://evilmartians.com/chronicles/graphql-on-rails-1-from-zero-to-the-first-query)
- [Apollo Queries](https://www.apollographql.com/docs/react/data/queries/)

## Your Considerations/Setup

### Instructions

#### Run

- Clone the repository
- In the repository
  - Run `docker-compose up`
    - I had an issue here regarding docker credHelpers -> I had to remove the key credHelpers from my ~/.docker/config.json file
    - Please note that the docker container for rails is not meant for active development, it's just meant to serve the app without any fuss
  - Wait for the build process to finish
  - Wait for the rails container to eventually start (a line should eventually show that says `Puma starting in single mode...`)
  - Navigate to localhost:3000 on your favourite browser

#### Tests

Tests currently need to be run outside of the docker environment. To run the tests,
use the docker-compose.test.yml file, install gems and npm packages locally, prepare the database, and then run the tests.

- Run the test docker-compose file
  - `docker-compose -f docker-compose.test.yml up`
  - Wait for the database to initialize
- Install all dependencies
  - `bundle install`
  - `npm install`
- Prepare the database
  - Change the database to the currently running docker container, exposed on localhost
    - Change the line `host: db` in config/database.yml to `host: localhost`
  - `RAILS_ENV=test bin/rake db:test:prepare`
- Run the tests
  - Rails: `RAILS_ENV=test bundle exec rspec`
  - Frontend: `npm run test`

### Derek's working notes

#### Requirements

- [x] When users navigate to the /articles route, a list of article should be displayed matching the designs (ignore the search bar and sorting options unless you're completing the relevant bonus objectives)
  - [x] base
    - [x] configure graphql article type
    - [x] configure author type
    - [x] attach apollo
    - [ ] STRETCH: configure pagination
  - [x] matching the designs
    - [x] font-family: open sans
    - [x] STRETCH: create layout component
    - [ ] STRETCH: improve loading screen
    - [ ] STRETCH: test + improve error screen
- [x] Articles should be fetched from Rails using GraphQL
- [x] Each article should display the title, introduction, image, author, and the date the article was created
  - [x] title
  - [x] intro
  - [x] image
  - [x] author
  - [x] date
- [x] When articles are clicked (Read More), a new tab should be opened displaying the body of the article
  - [x] configure new route
  - [x] add webpack and display article
  - [x] GQL to fetch single article
- [x] Build your components using modern React, including 'hooks' based components
- [x] Push to github
  - [x] public repo

#### Style & DX

- [x] Install pry (rails pry?)
- [x] Implement eslint linting (or perhaps prettier?)

#### Bonus

- [x] Make the articles searchable by title
  - [x] add graphql setup
  - [x] implement frontend
- [x] Make the articles sortable by various criteria like created date or title
  - [x] add graphql setup
  - [x] implement frontend
- [ ] Use a state management library such as Redux
- [x] Add unit tests! We like RSpec, Jest, and React Testing Library
  - [x] rails/controllers
    - [x] articles#index
    - [x] articles#show
  - [x] rails/graph
    - [x] Article tests
    - [x] Author tests
      - [x] type
      - [x] filtering
      - [x] sorting
    - [x] Schema execution tests
  - [x] frontend
    - [ ] packs/application.js
    - [x] components/layout
    - [x] features/articles-container
    - [x] features/article-container
    - [x] features/article-header
    - [x] features/article-item
    - [ ] features/articles-container
    - [ ] features/home
    - [x] Ensure coverage is running & improve
  - [ ] STRETCH: enable test run in docker
- [x] Dockerize your application (use a dockerfile and docker-compose)
  - [x] development run
  - [ ] STRETCH: production run
  - [ ] STRETCH: improve user configuration

#### Stretch

- [x] Improve match of styles to mockup
  - [x] targets:
    - [x] article headings
    - [x] article byline
    - [x] font sizing
    - [x] font paragraph line height
- [ ] Verify browsers
  - [ ] firefox
  - [ ] safari
  - [ ] mobile/chrome
  - [ ] mobile/safari
- [ ] add error boundaries to containers
- [x] Improve homepage
- [ ] Split webpack bundle into new one for article/:id route
  - [ ] alternatively use import to cause bundle splitting
- [ ] add 404 pages
  - [ ] article#show -> article not found
- [ ] Add helmet titles
- [ ] Enable scss loading on a component basis (stop using base styles file)
  - [ ] variables need to carry into new components
- [ ] Remove Go button -> rely instead on deboucing onChange events on each input

#### Clean

- [ ] Wave & axe (accessibility checkers) all pages, and patch
- [ ] resolve all TODOs
- [ ] Figure out URL switching when running article search
- [ ] mobile styles
- [ ] verify file size and pagespeed
  - [ ] optimize where possible

#### Not Doing

- Ensure browser-based font resizing works as expected (a11y)
- Refactor SCSS to align precisely w/ components
- Refactor app/graphql/types folder contents
  - base types should be in own folder
  - article and author types should be in own folder
- babel styled-components plugin
- Improving simplecov implementation to actually detect missing coverage
- remove unused files
  - backend
    - json api?
  - frontend
    - graph folder?
