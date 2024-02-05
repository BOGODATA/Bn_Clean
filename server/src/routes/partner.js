const express = require('express');
const Partner = require('../models/partner');
const router = express.Router();
const app = express();

router.post('/import-csv', async (req, res) => {
    const csvFilePath = 'path/to/your/csv/file.csv';
  
    try {
      const connection = await mysql.createConnection(dbConfig);
      
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', async (row) => {
          const { name, email, region } = row;
  
          await connection.execute('INSERT INTO partners (name, email, region) VALUES (?, ?, ?)', [name, email, region]);
        })
        .on('end', () => {
          connection.end(); 
          console.log('CSV import successful');
          res.json({ success: true, message: 'CSV import successful' });
        });
    } catch (error) {
      console.error('Error during CSV import', error);
      res.status(500).json({ error: 'Error during CSV import' });
    }
  });
router.get('/partenaires/:region', async (req, res) => {
    const region = req.params.region;
  
    try {
      const partenaires = await Partner.findAll({
        where: {
          region: region
        }
      });
  
      res.json({ partenaires });
    } catch (error) {
      console.error('Erreur lors de la récupération des partenaires par région', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des partenaires par région' });
    }
  });

module.exports = router;