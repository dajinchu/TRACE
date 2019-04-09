const express = require('express');
const cors = require('cors')
const request = require('request-promise-native');

const app = express();
app.use(cors())
module.exports = app;

app.get('*', (req, res) => {
  const UID = req.query.id;
  console.log(UID);
  if(typeof UID == 'undefined' || UID == ''){
    res.json([]);
    return;
  }
  request({json:true,uri:"http://35.237.184.11:9200/courses/_doc/"+UID+"/_source"})
    .then(body => {
      res.json(body);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

app.listen(3001)
