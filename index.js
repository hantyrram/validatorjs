// abstract holds the db instance
// contains the save and remove function
// 
const Mongodeler = require('./Mongodeler');
let instance = new Mongodeler();
module.exports = instance;