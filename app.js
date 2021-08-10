
var express = require('express');
const bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var indexRouter = require('./routes/index');
const config = require('./config/config')
var app = express();


global.config = require('./config/config')
global.request = require('request')

app.use(cors())



const expressSwagger = require('express-swagger-generator')(app);

let options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: config.envUrl,
    basePath: '/web/viewMap',
    produces: [
      "application/json",
      "application/xml"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",

      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/swagger.js'] //Path to the API handle folder
};
expressSwagger(options)



app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

global._ = require('underscore')
global.q = require('q')

app.use('/', indexRouter);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/* SERVER START */
let port = process.env.PORT || config.server.port
let server = app.listen(port)
server.timeout = 600000

console.log('Api is running on port', port)

module.exports = app;

