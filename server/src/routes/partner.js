const express = require('express');
const Partner = require('../models/partner');
const router = express.Router();
const app = express();
const fs = require('fs');
import '../../public/'
router.post('/import-csv', async (req, res) => {
    const csvFilePath = '/liste.csv';
  
    try {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', async (row) => {
          const { name, email, region,ville,type,address,cp,telephone,site,desc } = row;
  
          await connection.execute('INSERT INTO partners (nom, email, region,ville,type,address,cp,telephone,site,desc) VALUES (?, ?, ?)', [name, email, region,ville,type,address,cp,telephone,site,desc]);
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