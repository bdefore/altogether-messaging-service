require 'sequel'
require 'sinatra'
require 'dotenv/load'
# require 'pry'

DB = Sequel.connect(ENV['DATABASE_URL'] || 'sqlite://db/development.sqlite3')

set :root, 'app'

# Talk to Facebook
get '/webhook' do
  puts 'responding with token...'
  params['hub.challenge'] if ENV['VERIFY_TOKEN'] == params['hub.verify_token']
end

get '/message_history' do
  messages = DB[:messages]
  # binding.pry
  to_send = messages.all.to_json
  messages.delete
  to_send
end

get '/' do
  'Nothing to see here'
end

get '/spawner' do
  render :html, :index
end

post '/spawn' do
  messages = DB[:messages]
  data = JSON.parse request.body.read
  messages.insert(
    text: data['text'],
    sender: data['sender'],
    color: data['color'],
    x: data['x'],
    y: data['y'],
    timestamp: data['timestamp']
  )
  'OK'
end
