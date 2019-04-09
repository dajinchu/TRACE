const express = require('express');
const cors = require('cors');
const request = require('request-promise-native');
const jwtCheck = require('../auth.js');

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
  };
  if(!req.user){
    options.body['_source'] = ['name', 'profs.name', 'code'];
  }
  request(options)
    .then(body => {
      res.json(body.hits.hits.map(hit=>hit._source));
    })
    .catch(err =>{ 
      res.sendStatus(500);
    });
});
