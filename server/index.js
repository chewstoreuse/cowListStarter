const express = require('express');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
let db;

const path = require('path');

const PORT = 3000;
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${3000}!`);
  readline.question(`Choose your db: (mongo or mysql)\n>>>>>`, choice => {
    if (choice === 'mongo') {
      console.log('Your db is Mongo');
      db = require('../database/mongo');
    } else if (choice === 'mysql') {
      console.log('Your db is mysql');
      db = require('../database/mysql');
    } else {
      console.log('Stop node, restart and try again, valid options are mysql and mongo')
    }
  })

});

//*****MYSQL***** */

//*****MONGODB** */

//route to get all cows in db
app.get('/getCows', (req, res) => {
  db.getAllCows()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

//route to find a specific cow by name in the db
app.get('/findCow', (req, res) => {
  db.findCow(req.query.name)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

//route to add cows to db
app.post('/addCow', (req, res) => {
  db.addCow(req.body.name, req.body.description)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});