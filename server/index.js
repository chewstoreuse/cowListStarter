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

// //route to get all cows in the database
// app.get('/getCows', (req, res) => {
//   db.getAllCows((err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(results);
//     }
//   });
// });

// //route to get cow based on search
// app.get('/findCow', (req, res) => {
//   db.findCow(req.query.name, (err, results) => {
//     // console.log(req.query);
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(results);
//     }
//   })
// });

// //route to add a cow to the database
// app.post('/addCow', (req, res) => {
//   db.addCow(req.body.name, req.body.description, (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(results);
//     }
//   });
// });

// //route to edit the cow description
// app.put('/editCow', (req, res) => {
//   // console.log(req.query)
//   db.editCow(req.query.name, req.query.description, (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.sendStatus(204);
//     }
//   });
// });

// //route to delete a cow
// app.delete('/deleteCow', (req, res) => {
//   db.deleteCow(req.body.name, (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.sendStatus(204);
//     }
//   })
// });

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

//route to edit cow information
app.put('/editCow', (req, res) => {
  db.editCow(req.query.name, req.query.description)
    .then(response => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

//route to delete cow
app.delete('/deleteCow', (req, res) => {
  db.deleteCow(req.body.name)
    .then(response => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});