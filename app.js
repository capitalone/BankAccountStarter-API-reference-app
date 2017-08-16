/**
Copyright 2016 Capital One Services, LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.options('*', cors());
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var config = require('./api/config/config');
var request = require('request');
if(process.env.DEBUG && process.env.DEBUG=='http'){
  require('request-debug')(request);
}
var https = require('http');
var querystring = require('querystring');
var CreateAccountClient = require('./api/CreateAccountClient');
var CDTermsClient = require('./api/CDTermsClient');
var oauth = require('./api/oauth');
var oauthOptions = {
      //tokenURL: config.BASE_URI + '/oauth2/token',

      //Development
      tokenURL: 'https://apiit-internal.kdc.capitalone.com/oauth/oauth20/token',

      //For Sandbox IT
      //tokenURL: 'https://api-sandbox-external-it.cloud.capitalone.com/oauth2/token',//Internal
      //tokenURL: 'https://api-sandbox.capitalone.com/oauth2/token',//External


      // The clientId and clientSecret you received when registering your app.
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET
    };
var ClientOptions =  {
    // The URL of the Credit Offers environment you are connecting to.
    url: config.BASE_URI,
    apiVersion: 2
  };
//var PORT = process.env.PORT || 8001;
var PORT = process.env.PORT || 7001;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post("/deposits/account-applications", function(req, res, next) {
  var customerInfo = req.body;
  var client = new CreateAccountClient(ClientOptions, oauth(oauthOptions));
  client.createAccount(customerInfo, function (err, response) {
    if (err) { return next(err) }
    res.json(response);
  })
});

app.get("/deposits/account-products/3500", function(req, res, next) {
  var client = new CDTermsClient(ClientOptions, oauth(oauthOptions));
  client.getCDTerms(function (err, response) {
    if (err) { return next(err) }
    res.json(response);
  })
});

app.listen(PORT, 'localhost', function() {
  console.log('express server listening on port', PORT);
});
