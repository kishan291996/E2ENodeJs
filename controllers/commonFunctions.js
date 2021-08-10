var config = require('../config/config');

const apiUrl = config.api.url;

function getUrlPrefix() {
    var prefix = "";
    for (var jsonkeyApp in config) {
      if (jsonkeyApp == "app") {
        var app = config[jsonkeyApp];
        for (jsonkeyPrefix in app) {
          if (jsonkeyPrefix == "prefix")
            prefix = app[jsonkeyPrefix];
            break;
        }
      }
    }
    console.log("Inside Controller: "+prefix);
    return prefix.toString();
  }

  module.exports.getUrlPrefix = getUrlPrefix;