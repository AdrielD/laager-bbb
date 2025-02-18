require 'sinatra/base'
require 'sinatra/cross_origin'
require 'sinatra/activerecord'
require './models/vote'

require 'pry'

class App < Sinatra::Base
  register Sinatra::ActiveRecordExtension

  configure do
    enable :cross_origin
  end

  before do
    response.headers['Access-Control-Allow-Origin'] = '*'
  end

  set :database, { adapter: "sqlite3", database: "foo.sqlite3" }

  before do
    content_type :json
  end

  get '/votes' do
    info = {
      total_votes: Vote.count,
      votes_per_candidate: Vote.count_per_candidate,
      votes_per_hour: Vote.count_per_hour
    }.to_json
  rescue => e
    status 422
    { error: e }.to_json
  end

  post '/vote' do
    # binding.pry
    params = JSON.parse(request.body.read)
    vote = Vote.create!(
      voter_ip: params['voter_ip'],
      choice_id: params['choice_id']
    )

    status 201
    vote.to_json
  rescue => e
    status 500
    { error: e }.to_json
  end

  options "*" do
    response.headers["Allow"] = "GET, PUT, POST, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
    response.headers["Access-Control-Allow-Origin"] = "*"
    200
  end
end
