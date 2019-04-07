const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())
module.exports = app;

app.get('*', (req, res) => {
  query = req.query.q;
  if (query == ''){
    res.json([]);
  } else {
    res.json([
      {
        type: "course",
        UID: "82910",
        code: "CS 3500",
        name: "Object Oriented Design",
        profs: [
          {
            name: "Ben Lerner",
            UID: 81202,
            effectiveness: 5,
            personality: 5,
            challenge: 5,
            workload: 5,
            learning: 5,
            overall: 5,
          },
          {
            name: "Clark Freifeld",
            UID: 981,
            effectiveness: 4,
            personality: 4,
            challenge: 4,
            workload: 4,
            learning: 4,
            overall: 4,
          }
        ]
      },
      {
        type: "prof",
        name: "Matthias Felleisen",
        UID: "9201",
      }
    ]);
  }
});