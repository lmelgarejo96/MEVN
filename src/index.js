const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/db-mvn')
    .then(db => console.log('DB is connect'))
    .catch(err => console.log(err));
    
// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users.js'));

// Static files
app.use(express.static(__dirname + "/public"));

// Server listening
app.listen(app.get('port'), () => {
    console.log('Server on port '+app.get('port'));
});

