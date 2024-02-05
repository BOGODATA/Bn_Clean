const sequelize = require('./src/db/cnx');
const Participation = require('./src/models/participation');
const Partner =require('./src/models/partner')

require("./bnclean")
sequelize.sync()
  .then(() => {
    console.log('Modèles synchronisés avec la base de données');
  })
  .catch((err) => {
    console.error('Erreur lors de la synchronisation des modèles :', err);
  });
