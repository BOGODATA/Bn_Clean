const { DataTypes } = require('sequelize');
const sequelize = require('../db/cnx');


const Partner = sequelize.define('partner', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    region: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: { 
         type: DataTypes.STRING,
        allowNull: false,},
    telephone: {   
        type: DataTypes.STRING,
        allowNull: false, },
    type: {   type: DataTypes.STRING,
        allowNull: false, },
    email: {   type: DataTypes.STRING,
        allowNull: false, },
    cp: {   type: DataTypes.STRING,
        allowNull: false, },
    address: {   type: DataTypes.STRING,
        allowNull: false, },
    ville: {   type: DataTypes.STRING,
        allowNull: false, },
    site: {   type: DataTypes.STRING,
        allowNull: false,},
});
module.exports = Partner;