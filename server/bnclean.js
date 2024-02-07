const express = require('express');
const participation = require('./src/routes/participation'); 
const partner = require('./src/routes/partner'); 

const session = require('express-session');

const app = express();
const PORT = 8081;
const cors = require('cors');
const path = require('path');

app.use(express.static('public'))
app.use(session({
  secret: 'your-secret-key', 
  resave: true,
  saveUninitialized: true
}));
app.use(express.json());
app.use(cors());
app.use('/api', participation); 
app.use('/api', partner); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/index.html'));
   
  });
  app.get('/choix', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/choix.html'));
});
app.get('/congrats', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/pages/felicita.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

