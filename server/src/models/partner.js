const { DataTypes } = require('sequelize');
const sequelize = require('../db/cnx');


const Partner = sequelize.define('Partenaire', {
    name: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    desc: {type: String,required:true},
    telephone: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true },
    cp: { type: String, required: true },
    address: { type: String, required: true },
    ville: { type: String, required: true },
    site: { type: String, required: true },
});
module.exports = Partner;