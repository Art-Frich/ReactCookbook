// utils
const checkTerms = (obj, terms) => obj.indexOf(terms) !== -1;

// app
const express = require('express');
const cors = require('cors');

const app = express();
const cities = require('./cities.json');

app.use(express.json());
app.use(cors());

app.get('/search', (req, res) => {
  const terms = req.query['terms'].toUpperCase();

  res.send(
    cities.filter((city) => {
      const name = city['name'].toUpperCase();
      const state = city['state'].toUpperCase();

      return checkTerms(name, terms) || checkTerms(state, terms);
    })
  );
});

app.listen(5000, () => console.log('Server running on port 5000'));
