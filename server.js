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
const superagent = require('superagent');

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
app.use(express.urlencoded({ extended: true }));

// test routes
app.get('/', (req, res) => {
  res.render('pages/index');
});

// New search route
app.get('/searches/new', (req, res) => {
  res.render('pages/searches/new');
});

//Handle sreach request
app.post('/searches', async (req, res) => {
  let searchInput = req.body.searchInput;
  let searchType = req.body.searchType;
  let status = 200;
  res.status(status).send(await getBooks(searchInput, searchType));
});

// fucntion to get books from google book api
function getBooks(searchInput, searchType) {
  let url = 'https://www.googleapis.com/books/v1/volumes';
  let queryParams;
  if (searchType === 'title') {
    queryParams = {
      q: `intitle:${searchInput}`,
    };
  } else {
    queryParams = {
      q: `inauthor:${searchInput}`,
    };
  }
  let data = superagent
    .get(url)
    .query(queryParams)
    .then((res) => {
      return res.body.items.map(e =>{
        return new Book(e);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}

// Render data in show

// creating book constructor
function Book(data) {
  this.image = data.volumeInfo.imageLinks.thumbnail || 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = data.volumeInfo.title;
  this.authers = data.volumeInfo.authors;
  this.description = data.volumeInfo.description || 'There is no description';
}
