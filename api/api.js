const express = require('express')
const request = require('request')
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
  var client_id = process.env.CLIENT_ID;
  // res.cookie(stateKey, state);
  var scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private '
  res.redirect('https://accounts.spotify.com/authorize?' +
    queryString.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: process.env.BASE_URL + '/api/callback',
      state: state,
      show_dialog: 'true'
      })
    );
  }
)

app.get('/callback', (req, res) => {
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: req.query.code,
      redirect_uri: process.env.BASE_URL + '/api/callback',
      grant_type: 'authorization_code',
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    const query = queryString.stringify({
      "access_token": body.access_token,
      "refresh_token": body.refresh_token
    });
    res.redirect(process.env.BASE_URL + '/callback?' + query);
  });
})

module.exports = {
   path: '/api',
   handler: app
} 