const sequelize = require('./src/db/cnx');
const Participation = require('./src/models/participation');

require("./app")
sequelize.sync()
  .then(() => {
    console.log('Modèles synchronisés avec la base de données');
  })
  .catch((err) => {
    console.error('Erreur lors de la synchronisation des modèles :', err);
  });
