const express = require('express');
const cors = require('cors')
const request = require('request-promise-native');
const jwtCheck = require('../auth.js');

const app = express();
app.use(cors())
app.use(jwtCheck);
module.exports = app;

app.get('*', (req, res) => {
  const UID = req.query.id;
  console.log(UID);
  if(typeof UID == 'undefined' || UID == ''){
    res.json([]);
    return;
  }
  filter = req.user ? "" : "?_source_excludes=*comments,*metrics";
  request({json:true,uri:"http://35.237.184.11:9200/courses/_doc/"+UID+filter})
    .then(body => {
      res.json(body._source);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

app.listen(3001)
