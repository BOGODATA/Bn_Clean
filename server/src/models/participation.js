const { DataTypes } = require('sequelize');
const sequelize = require('../db/cnx');

const Participation = sequelize.define('Participation', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, 
    },
  },

  imageFacture: {
    type: DataTypes.STRING, 
    allowNull: true, 
    
  },
 
  
  actualite: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  etat: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue:false,
  },
});

module.exports = Participation;