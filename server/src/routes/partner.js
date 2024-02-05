const express = require('express');
const Partner = require('../models/partner');
const router = express.Router();
const app = express();


router.get('/partenaires/:region', async (req, res) => {
    const region = req.params.region;
  
    try {
      // Utilisez Sequelize pour faire la requête à la base de données
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