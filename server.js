'use strict';

// Decalaring varaibles
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// initialize the server
const app = express();

// Use cros
app.use(cors());

// Use super agent
// const superagent = require('superagent');

// Declare a port
const PORT = process.env.PORT || 3000;

// Test the server
app.listen(PORT, () => {
  console.log('I am listening to port: ', PORT);
});

// view engine setup
app.set('view engine', 'ejs');

//setup public folder
app.use(express.static('./public'));

//set the encode for post body request
// app.use(express.urlencoded({ extended: true }));

// test routes
app.get('/', (req, res) => {
  res.render('pages/index');
});

// New search route
app.get('/searches/new', (req, res) => {
  res.render('pages/searches/new');
});
