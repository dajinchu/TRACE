const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())
module.exports = app;

app.get('*', (req, res) => {
  res.json({
    UID: "81202",
    name: "Ben Lerner",
    avg: {"lecture":4.46,"workload":17.75,"personality":4,"overall":4.56,"challenge":4.46,"learning":4.43},
    courses: [
      {
        UID: 8129,
        code: "CS 3500",
        name: "Object Oriented Design",
        semesters: [
          {
            UID: 87,
            name: "Fall 2018",
            metrics: {
              "lecture": 4,
              "workload": 20,
              "personality":4,
              "overall":4.5,
              "challenge":4.4,
              "learning":4.2
            }
          },
          {
            UID: 83,
            name: "Spring 2018",
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
        UID: 2912,
        code: "CS 2500",
        name: "Fundamentals of Computer Science 1",
        semesters: [
          {
            UID: 21,
            name: "Spring 2016",
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
      }
    ]
  });
});