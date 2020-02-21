const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));
app.use(morgan('dev'));

app.use(proxy('/api', {
  target: 'https://www.googleapis.com',

}));
app.use(express.static(__dirname + '/dist/apps/dashboard'));
app.use('/*', express.static(__dirname + '/dist/apps/dashboard/index.html'));

const port = process.env.PORT || 4200;
app.listen(port);
console.info(`BOUNCE on PORT /* on [${port}]`);
