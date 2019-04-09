const express = require('express');
const cors = require('cors');
const request = require('request-promise-native');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://searchtrace.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://localhost:3000/backend/api',
    issuer: 'https://searchtrace.auth0.com/',
    algorithms: ['RS256']
});

const app = express();
app.use(cors());
app.use(jwtCheck);
module.exports = app;

app.get('*', (req, res) => {
  const query = req.query.q;
  if(typeof query == 'undefined' || query == ''){
    res.json([]);
    return;
  }
  options = {
    method: 'POST',
    uri: 'http://35.237.184.11:9200/courses,profs/_search',
    body: {
      "size": 20,
      "query": {
        "multi_match": {
            "query": query,
            "fields": ["name", "profs.name", "code^3"]
        }
      },
        "indices_boost" : [
          { "profs" : 10 },
          { "courses" : 1 }
      ]
    },
    json: true,
  }
  request(options)
    .then(body => {
      res.json(body.hits.hits.map(hit=>hit._source));
    })
    .catch(err =>{ 
      res.sendStatus(500);
    });
});
