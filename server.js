const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');

//Si causa error en heroku mover al inicio del documento
if ( process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

//motor de plantilla
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    limit:'10mb',
    extended: false
}));

app.use('/', indexRouter);
app.use('/authors', authorsRouter);

//db conecct
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', MONGO_URI => console.log('Connected to Database'))

app.listen(process.env.PORT || 3000);