var express = require('express');
var app = express();

var router = express.Router();
const varifyLogin = require('../controllers/varifyLogin')
const commonFunctions = require('../controllers/commonFunctions')
let getUrlPrefix = commonFunctions.getUrlPrefix()
console.log('getUrlPrefix Routess: ' + getUrlPrefix)

app.use(express.static('public'));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post(getUrlPrefix + '/loginVarify', function (req, res, next) {
  varifyLogin.loginVarify(req, res, next)
})


module.exports = router;
