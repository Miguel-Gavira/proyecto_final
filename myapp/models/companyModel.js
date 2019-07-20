const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompanyModel = new Schema({
    name: String,
    address: String,
    telephone: Number,
    type: String,
    password: String
}, {collection: 'companies'});

module.exports = mongoose.model('companyModel', CompanyModel);