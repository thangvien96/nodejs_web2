const express = require('express');
//const morgan = require('morgan');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const route = require('./routes');
const session = require('express-session');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('./src/public'));
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded


//app.use(morgan('combined'));

app.use(
  session({
    secret: 'its my secret',
    cookie: { maxAge: 300000 }, // value of maxAge is defined in milliseconds. 
    resave: false,
    rolling: false,
    saveUninitialized: true
  })
);


app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './src/resources/views');

route(app);

app.listen(port, () => {
  console.log(`Example app listening ${process.env.VIETNAM}`)
})