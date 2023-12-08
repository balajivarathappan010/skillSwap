const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const cors = require('cors');
const crypto = require('crypto');
const app = express();
const location = path.join(__dirname,"./public");
const port = 2020;

app.use(express.static(location));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'hbs');
app.use(session({
    secret: crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: true,
  }));
// app.use(cookieParser());
app.use('/', require('./routes/get'));
app.use('/post', require('./routes/post'));

app.listen(port, ()=>{
    console.log(`Server started ${port}`);
});