const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cowlist'
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MySQL!')
  }
});

module.exports = connection;





// Don't forget to export your functions!
module.exports = {
  getAllCows: function (callback) {
    connection.query(
      'SELECT * FROM cows',
      function (err, results) {
        if (err) {
          callback(err);
        } else {
          callback(null, results);
        }
      }
    );
  },

  addCow: function (name, description, callback) {
    connection.query(
      `INSERT INTO cows (name, description) VALUES ('${name}', '${description}')`,
      function (err, results) {
        if (err) {
          callback(err);
        } else {
          callback(null, results);
        }
      }
    );
  },

  findCow: function (name, callback) {
    console.log('in db', name)
    connection.query(
      `SELECT * FROM cows WHERE name = '${name}'`,
      function (err, results) {
        if (err) {
          callback(err);
        } else {
          callback(null, results);
        }
      }
    );
  },

  editCow: function (name, description, callback) {
    connection.query(
      `UPDATE cows SET description = '${description}' WHERE name = '${name}'`,
      function (err, results) {
        if (err) {
          callback(err);
        } else {
          callback(null, results);
        }
      }
    );
  },

  deleteCow: function (name, callback) {
    connection.query(
      `DELETE FROM cows WHERE name = '${name}'`,
      function (err, results) {
        if (err) {
          callback(err);
        } else {
          callback(null, results);
        }
      }
    );
  }
};
