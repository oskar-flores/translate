'use strict';
const http_request = require('request');
var text = "prueba"
var authUrl = "http://api.microsofttranslator.com/v2/Http.svc/Translate?text=" + text + "&from=en&to=es";
var client_id = "SlackTraslator";
var client_secret = "7qcslUYzpwCkUDcC/0P1eoA/xuWbB9Tr8CZDkcJlNzo=";
var scope = "http://api.microsofttranslator.com";
var grant_type = "client_credentials";
var tokenUrl = 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13/';


function getToken (cache) {
    var bodyJson;
    http_request.post({
            url: tokenUrl,
            form: {
                client_id: client_id,
                client_secret: client_secret,
                scope: scope,
                grant_type: grant_type
            }
        },
        function(error, response, body) {
            var form = {
                'client_id': client_id,
                'client_secret': client_secret,
                'scope': scope,
                'grant_type': grant_type
            };
            if (!error && response.statusCode == 200) {
                bodyJson = JSON.parse(body);
                console.log(bodyJson)
                cache.get("access_token", function(err, value) {
                    if (!err) {
                        if (value == undefined) {
                            cache.set('access_token', bodyJson.access_token)
                        }
                    }
                });
                      console.log ("En cache");
     console.log (cache.get("access_token"));
     console.log ("En global");
     console.log (global.cache.get("access_token"));
            } else {
                console.log("error : " + body.access_token)
            }
        });
}


module.exports = function(options) {
    var self = this;
    var bodyJson;
    var access_token= cache.get("access_token", function(err, value) {
        if (!err) {
            if (value == undefined) {
                getToken(global.cache);
                console.log ("es undefined");
                cache.get("access_token");
            }
        }
    });
    console.log(access_token);
    return function(req, res, next) {
        http_request.get({
                url: authUrl,
                'auth': {
                    'bearer': ' ' + access_token
                }
            },
            function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('helper_ok');
                    console.log(body)
                } else {
                    console.log('helper_error');
                    console.log(error)
                }
            });
        next();
    };
};
