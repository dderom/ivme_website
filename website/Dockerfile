FROM ruby:3.4-slim-bookworm

RUN apt-get update     && apt-get install -y --no-install-recommends build-essential git     && rm -rf /var/lib/apt/lists/*

WORKDIR /site
COPY Gemfile Gemfile.lock* ./
RUN bundle install

EXPOSE 4000
ENTRYPOINT ["bundle", "exec", "jekyll"]
CMD ["serve", "--host", "0.0.0.0", "--force_polling"]
