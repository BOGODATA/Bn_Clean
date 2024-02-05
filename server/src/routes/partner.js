const express = require('express');
const router = express.Router();
const app = express();



router.get('/partenaires/:region', async (req, res) => {
    const region = req.params.region;
  
    try {
      const [rows, fields] = await pool.execute('SELECT * FROM partner WHERE region = ?', [region]);
  
      res.json({ partenaires: rows });
    } catch (error) {
      console.error('Erreur lors de la récupération des partenaires par région', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des partenaires par région' });
    }
  });
  
module.exports = router;