FROM ruby:2.7.1-alpine

RUN \
  apk add --no-cache --update \
    build-base \
    linux-headers \
    git \
    postgresql-client \
    postgresql-dev \
    nodejs \
    npm \
    yarn \
    tzdata

ENV APP_HOME /app

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/
RUN bundle install

ADD package.json $APP_PATH
ADD package-lock.json $APP_PATH
RUN npm install

ADD . $APP_HOME
EXPOSE 3000
