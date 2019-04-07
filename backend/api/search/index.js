const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())
module.exports = app;

app.get('*', (req, res) => {
  res.json([
    {
      type: "course",
      uid: "82910",
      code: "CS 3500",
      name: "Object Oriented Design",
      profs: [
        {
          name: "Ben Lerner",
          effectiveness: 5,
          personality: 5,
          challenge: 5,
          workload: 5,
          learning: 5,
          overall: 5,
        },
        {
          name: "Clark Freifeld",
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
      uid: "9201",
    }
  ]);
});