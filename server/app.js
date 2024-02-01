const express = require('express');
const participation = require('./src/routes/participation'); 
const app = express();
const PORT = 8081;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api', participation); 

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

