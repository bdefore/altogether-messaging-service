require 'facebook/messenger'
require 'sequel'

include Facebook::Messenger

Facebook::Messenger::Subscriptions.subscribe(access_token: ENV['ACCESS_TOKEN'])

DB = Sequel.connect(ENV['DATABASE_URL'] || 'sqlite://db/development.sqlite3')

options = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: 'What would you like to spawn?',
      buttons: [
        { type: 'postback', title: 'Object', payload: 'option1' },
        { type: 'postback', title: 'Food', payload: 'option2' },
        { type: 'postback', title: 'Animal', payload: 'option3' }
      ]
    }
  }
}

Bot.on :message do |message|
  puts "Received '#{message.inspect}' from #{message.sender}" 
  
  if message.text.downcase == 'start'
    message.reply(options)
  else
  end
end

Bot.on :postback do |postback|
  $stderr.puts "Received postback: '#{postback.inspect}'"
  messages = DB[:messages]
  messages.insert(:text => postback.payload, :sender => postback.sender["id"], :color => "#0000ff", :x => rand(), :y => rand())
  postback.reply(text: 'Spawning!')
  postback.reply(options)
end
