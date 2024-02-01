const express = require('express');
const participation = require('./src/routes/participation'); 
const app = express();
const PORT = 8081;
const cors = require('cors');
const path = require('path');

app.use('/images', express.static(path.join(__dirname, '..', 'client', 'public')))

app.use(express.json());
app.use(cors());
app.use('/api', participation); 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/index.html'));
  });
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

