const DecisionTree = require('decision-tree');
const express = require('express');
const router = express.Router();

const class_name = "gave";
const features = ["gender", "age"];
const training_data = [{
    "gender": "M",
    "age": "20",
    "gave": false
  },
  {
    "gender": "M",
    "age": "30",
    "gave": false
  },
  {
    "gender": "M",
    "age": "25",
    "gave": false
  },
  {
    "gender": "M",
    "age": "70",
    "gave": true
  },
  {
    "gender": "M",
    "age": "60",
    "gave": true
  },
  {
    "gender": "M",
    "age": "80",
    "gave": true
  },
  {
    "gender": "M",
    "age": "80",
    "gave": true
  }, {
    "gender": "M",
    "age": "90",
    "gave": true
  }, {
    "gender": "M",
    "age": "60",
    "gave": true
  }, {
    "gender": "M",
    "age": "70",
    "gave": true
  },
  {
    "gender": "F",
    "age": "20",
    "gave": true
  },
  {
    "gender": "F",
    "age": "20",
    "gave": true
  },
  {
    "gender": "F",
    "age": "30",
    "gave": true
  },
  {
    "gender": "F",
    "age": "35",
    "gave": true
  },
  {
    "gender": "F",
    "age": "25",
    "gave": true
  },
  {
    "gender": "F",
    "age": "75",
    "gave": false
  },
  {
    "gender": "F",
    "age": "75",
    "gave": false
  },
  {
    "gender": "F",
    "age": "85",
    "gave": false
  },
  {
    "gender": "F",
    "age": "55",
    "gave": false
  },
  {
    "gender": "F",
    "age": "85",
    "gave": false
  },
  {
    "gender": "F",
    "age": "65",
    "gave": false
  },
  {
    "gender": "F",
    "age": "65",
    "gave": false
  }
];

const dt = new DecisionTree(training_data, class_name, features);
//const accuracy = dt.evaluate(test_data);

router.post('/', (req, res) => {
  res.json(dt.predict({
    gender: req.body.gender,
    age: req.body.age
  }));
});

module.exports = router;
