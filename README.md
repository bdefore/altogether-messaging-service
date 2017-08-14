# Altogether Messaging Service

This code was used for the messaging layer between phones and VR. It was created for the NYC Unity VR Game Jam event in August 2017. It operates both as a Facebook messenger bot and as a basic web application via Sinatra and React.

The game is available here: https://evcprc.itch.io/altogether

#### Setup

- Copy `.env.example` to `.env` and populate the variables. You will need to have a Facebook developer account and have created an access token for a page with a (free) Messenger product assigned to it.
- `npm install`
- `npm run build`
- `ruby app.rb`

#### Deploying

The app is intended to be deployed with Heroku. A free Postgres add-on is all you need to configure before deploying to it.
