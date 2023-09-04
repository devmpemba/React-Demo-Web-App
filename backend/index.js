//declaration and init
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); //1

const app = express();
const port = 5001;

app.use(bodyParser.json()); //

app.use(bodyParser.urlencoded({
    extended: true
}));

//database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'demo',
});

db.connect(error => {

  if (!error){
    console.log('Connected to MySQL database');

  } else{
    throw error;
  }
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





// API endpoint for user login
// app.post('/api/login', (req, res) => {
//     const { username, password } = req.body;
  
//     // For now, let's assume a simple login success response
//     if (username === 'validUser' && password === 'password123') {
//       res.json({ success: true, message: 'Login successful' });
//     } else {
//       res.json({ success: false, message: 'Invalid credentials' });
//     }
//   });
  
  // app.listen(port, () => {
  //   console.log(`Server is running on port ${port}`);
  // });



  // Retrieve all users 
 app.get('/users', function (req, res) {
     db.query('SELECT * FROM users', function (error, results, fields) {
         if (!error) {

          return res.send({ 
            error: false, 
            data: results, 
            message: 'users list.' 
          });

         } else {
          throw error;

         }

        
     });
 });






 // Retrieve user with id 
 app.get('/user/:id', function (req, res) {
     let user_id = req.params.id;
     if (!user_id) {
      return 
      res.status(400).send({ 
        error: true, 
        message: 'Please provide user_id' });
     }

     db.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
      if (error) throw error;
       return res.send({ 
        error: false, 
        data: results[0], 
        message: 'users list.' 
      });

     });
 });

 // Add a new user  
 app.post('/user', function (req, res) {
     let user = req.body.user;
     if (!user) {
       return res.status(400).send({ error:true, message: 'Please provide user' });
     }
    db.query("INSERT INTO users SET ? ", { user: user }, function (error, results, fields) {
   if (error) throw error;
     return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
     });
 });


 //  Update user with id
 app.put('/user', function (req, res) {
 let user_id = req.body.user_id;
 let user = req.body.user;
 if (!user_id || !user) {
   return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
 }
 db.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
   if (error) throw error;
   return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
  });
 });


 //  Update user with id
 app.put('/user', function (req, res) {
 let user_id = req.body.user_id;
 let user = req.body.user;
 if (!user_id || !user) {
   return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
 }
 db.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
   if (error) throw error;
   return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
  });
 });
