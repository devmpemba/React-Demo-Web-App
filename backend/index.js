const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'demo',
});

db.connect(error => {
  if (!error) {
    console.log('Connected to MySQL database');
  } else {
    console.error('Error connecting to the database:', error);
  }
});

// Create an API endpoint to receive name and email


app.post('/register', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: true,
      message: 'Both name and email are required fields',
    });
  }

  // Check if the email already exists in the database
  const checkEmailQuery = 'SELECT COUNT(*) as count FROM users WHERE email = ?';

  db.query(checkEmailQuery, [email], (error, results) => {
    if (error) {
      console.error('Error checking email:', error);
      return res.status(500).json({
        error: true,
        message: 'Error checking email',
      });
    }

    const emailExists = results[0].count > 0;

    if (emailExists) {
      return res.status(409).json({
        error: true,
        message: 'Email already exists',
      });
    }

    // If the email doesn't exist, proceed to insert the user
    const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';

    db.query(insertQuery, [name, email], (error, results) => {
      if (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({
          error: true,
          message: 'Error registering user',
        });
      }

      console.log('User registered successfully');
      return res.status(201).json({
        error: false,
        message: 'User registered successfully',
      });
    });
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: 'Both email and password are required fields',
    });
  }

  // Query to check if the user with the given email and password exists
  const checkUserQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(checkUserQuery, [email, password], (error, results) => {
    if (error) {
      console.error('Error checking user:', error);
      return res.status(500).json({
        error: true,
        message: 'Error checking user',
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        error: true,
        message: 'Invalid email or password',
      });
    }

    // User is successfully authenticated
    return res.status(200).json({
      error: false,
      message: 'Login successful',
      user: results[0], // You can send user data if needed
    });
  });
});



// app.post('/register', (req, res) => {
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({
//       error: true,
//       message: 'Both name and email are required fields',
//     });
//   }

//   const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';

//   db.query(insertQuery, [name, email], (error, results) => {
//     if (error) {
//       console.error('Error registering user:', error);
//       return res.status(500).json({
//         error: true,
//         message: 'Error registering user',
//       });
//     }

//     console.log('User registered successfully');
//     return res.status(201).json({
//       error: false,
//       message: 'User registered successfully',
//     });
//   });
// });

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
