'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = express.Router();
const mongoose = require('mongoose');
var path = require('path');
const port = process.env.PORT || 3000;

//for views
//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test')
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));


// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));

require('./routes/routes')(router);

app.use('/api/v1', router);


app.listen(port);

console.log(`App Runs on ${port}`);



