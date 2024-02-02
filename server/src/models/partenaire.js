const { DataTypes } = require('sequelize');
const sequelize = require('../db/cnx');

const Participation = sequelize.define('Partenaire', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activite: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ville: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    commentaire: {
        type: DataTypes.STRING,
        allowNull: true,

    },


 
});

module.exports = Participation;