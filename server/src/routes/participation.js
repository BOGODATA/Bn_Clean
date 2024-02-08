const express = require('express');
const Participation = require('../models/participation');
const sequelize = require('../db/cnx');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

const session = require('express-session');
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const absolutePath = path.resolve(__dirname, '../../public/images');
    cb(null, absolutePath);
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, hash) => {
      if (err) return cb(err);
      const fileName = `${hash.toString('hex')}${path.extname(file.originalname)}`;
      cb(null, fileName);
    });
  },
});

const upload = multer({ storage });

router.post('/add-participationBn', upload.any(), async (req, res) => {
  try {
    const {  nom, prenom, email, actualite } = req.body;
    console.log(req.files[0]);
    const imageFacture = req.files[0].filename;
    console.log(imageFacture);

    const participation = await Participation.create({
      date: new Date(),
      nom,
      prenom,
      email,
      imageFacture,
      actualite,
    });
    res.status(201)

    

 


  } catch (error) {
    res.status(500)
  }
});
router.get('/get-all-participationsBn', async (req, res) => {
  try {
    const participations = await Participation.findAll();
    const participationsWithFiles = await Promise.all(participations.map(async participation => {
      const imagePath = path.join(__dirname, '../../public/images', participation.imageFacture);
      const imageBuffer = fs.readFileSync(imagePath);
      const imageBase64 = imageBuffer.toString('base64');

      return {
        id: participation.id,
        date: participation.date,
        nom: participation.nom,
        prenom: participation.prenom,
        email: participation.email,
        imageFacture: {
          filename: participation.imageFacture,
          data: imageBase64,
        },
        actualite: participation.actualite,
        etat:participation.etat,
        partenaireId:null
      };
    }));

    res.status(200).json(participationsWithFiles);
    req.session.participationId = participationsWithFiles.id;

  } catch (error) {
    console.error('Error fetching participations:', error);
    res.status(500).json({ error: 'Error fetching participations', details: error.message });
  }
});
router.post('/validate-participationBn/:id', async (req, res) => {
  try {
    const participationId = req.params.id;
    
    const updatedParticipation = await Participation.update({ etat: true }, {
      where: {
        id: participationId
      }
    });

    if (updatedParticipation[0] === 0) {
      return res.status(404).json({ error: 'Participation not found' });
    }

    res.status(200).json({ message: 'Participation validated successfully' });
  } catch (error) {
    console.error('Error during participation validation:', error);
    res.status(500).json({ error: 'Error during participation validation', details: error.message });
  }
});

router.post('/assign-partner/:email', async (req, res) => {
  try {
    const { partenaireId } = req.body;
    const email = decodeURIComponent(req.params.email);

    const participation = await Participation.findOne({
      where: {
        email: email,
      },
    });

    if (!participation) {
      return res.status(404).json({ error: 'Participation not found for the given email' });
    }

    const updatedParticipation = await Participation.update({ partenaireId: partenaireId }, {
      where: {
        id: participation.id,
      },
    });

    if (updatedParticipation[0] === 0) {
      return res.status(500).json({ error: 'Error updating partenaireId for the participation' });
    }

    res.status(200).json({ message: 'PartenaireId updated successfully' });
  } catch (error) {
    console.error('Error during updating partenaireId:', error);
    res.status(500).json({ error: 'Error during updating partenaireId', details: error.message });
  }
});
module.exports = router;