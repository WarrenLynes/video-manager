const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));
app.use(morgan('dev'));

app.use('*', function(req, res) {
  console.log(req.url);
});

const port = process.env.PORT || 5000;
app.listen(port);
console.info(`BOUNCE on PORT /* on [${port}]`);
