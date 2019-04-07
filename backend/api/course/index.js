const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())
module.exports = app;

app.get('*', (req, res) => {
  res.json({
    UID: "9120",
    code: "CS 2500",
    name: "Fundamentals of Computer Science 1",
    avg: {"lecture":4.46,"workload":17.75,"personality":4,"overall":4.56,"challenge":4.46,"learning":4.43},
    profs: [
      {
        UID: 3289,
        name: "Matthias Felleisen",
        semesters: [
          {
            UID: 73,
            name: "Fall 2017",
            metrics: {
              "lecture": 5,
              "workload": 15,
              "personality":4,
              "overall":5,
              "challenge":5,
              "learning":5
            }
          }
        ]
      },
      {
        UID: 3289,
        name: "Alan Mislove",
        semesters: [
          {
            UID: 87,
            name: "Fall 2018",
            metrics: {
              "lecture": 5,
              "workload": 15,
              "personality":4,
              "overall":4.5,
              "challenge":4.5,
              "learning":4.5
            }
          },
          {
            UID: 83,
            name: "Spring 2019",
            metrics: {
              "lecture": 4.2,
              "workload": 15,
              "personality":4.1,
              "overall":4.4,
              "challenge":4.2,
              "learning":4.5
            }
          }
        ]
      },
      {
        UID: 3289,
        name: "Olin Shivers",
        semesters: [
          {
            UID: 87,
            name: "Fall 2018",
            metrics: {
              "lecture": 5,
              "workload": 12,
              "personality":4,
              "overall":4,
              "challenge":4.5,
              "learning":4
            }
          }
        ]
      },
    ]
  });
});