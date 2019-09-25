const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const favorites = require('./routes/favorites');
const PORT = 3000;
const login = require('./routes/login.js');
const sessionController = require('./controllers/sessionController.js');

app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/signedin', sessionController.isLoggedIn, (req, res)=> {
  if (res.locals.verified === 'verified') {
    console.log('verified', res.locals);
    res.status(200).send(res.locals);
  } else {
    res.status(200).sendFile(path.join(__dirname, '../index.html'));
  }
})

app.get('/signout', sessionController.signOut, (req, res)=> {
  console.log('hit 2')
  if(res.locals.signedOut === "signedOut") {
    res.status(200).send('signedOut');
  }
});

app.use('/signup', login)
//route to login
app.use('/login', login);
// route to favorites
app.use('/favorites', favorites);
// route to home page
app.get('/', (req, res) => {
   res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use('*', (req, res) => {
  res.status(404).send('Route not found');
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
