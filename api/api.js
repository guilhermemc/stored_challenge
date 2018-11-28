const express = require('express')
var queryString = require('querystring');
const app = express()


function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

app.get('/', (req, res) => {
  var state = makeid();
  console.log(process.env)
  var client_id = '9a333a851cfc43fea08a9007edaf29bf';
  // res.cookie(stateKey, state);
  var scope = 'user-read-private user-read-email'
  res.redirect('https://accounts.spotify.com/authorize?' +
  queryString.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: 'http://localhost:3000/callback',
    state: state
    }));
  }
)

module.exports = {
   path: '/api',
   handler: app
} 