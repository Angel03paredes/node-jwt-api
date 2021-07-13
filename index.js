const express = require('express');
const morgan = require('morgan');

const router = require('./src/routers/User.routes');
require('./src/db')

const app = express();

app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api',router);

app.listen(app.get('port'));
