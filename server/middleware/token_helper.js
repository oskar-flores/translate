'use strict';
const http_request = require('request');
var authUrl = 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13/';
var loopback = require('loopback');
var app = loopback();

var client_id = "SlackTraslator";
var client_secret = "7qcslUYzpwCkUDcC/0P1eoA/xuWbB9Tr8CZDkcJlNzo=";
var scope = "http://api.microsofttranslator.com";
var grant_type = "client_credentials";

/**
 * Middleware definition ifot getting the Ms toke authentication
 * @param  {[type]}
 * @return {[type]}
 */
module.exports = function(options) {
    var bodyJson;
    return function(req, res, next) {

        next();
    };
};
