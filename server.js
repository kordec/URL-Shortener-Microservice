// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var db = require('./database')
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

db.connect()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {          
  res.sendFile(process.cwd() + '/views/index.html')                      
})

app.get("/new/*", function (req, res) {
  let url = req.url.slice(5)
  if(isValidUrl(url)) {
    db.nextId(d => {
      let item = {original: url, short: d}
      db.insert(item, created => res.send({original: created.original, short: req.headers.host + '/' + created.short}))
    })
  } else {
   res.send({error: 'not a valid url'}) 
  }
});

app.get("/*", function (req, res) {
  let url = req.url.slice(1)
  let key = ({short: url})
  db.get(key, found => {
    if(found) {
      res.redirect(found.original)
    } 
    else res.send({error: 'not found'})
  })
})

function isValidUrl(url) {
  let validator = /^https?:\/\/(\w+[\-]?\w+\.)[^\s]*/
  return validator.test(url)
}

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  response.sendStatus(200);
});

// Simple in-memory store for now


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
