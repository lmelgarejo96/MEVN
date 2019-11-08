const mongoose = require('mongoose');
const {Schema} = mongoose;

const User = new Schema ({
    name: String,
    correo: String,
    description : String
});

module.exports = mongoose.model('User', User);