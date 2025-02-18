FROM ruby:3.4-alpine

WORKDIR /app
RUN apk add --update \
  build-base \
  libxml2-dev \
  libxslt-dev\
  yaml-dev \
  libffi-dev \
  && rm -rf /var/cache/apk/*

RUN gem install bundler

COPY Gemfile Gemfile.lock Rakefile ./
COPY app.rb config.ru ./
COPY ./models/ ./models/
COPY ./db/ ./db/
RUN bundle install

EXPOSE 4000

CMD ["sh", "-c", "bundle exec rake db:migrate && bundle exec rackup -p 4000 --host 0.0.0.0"]
