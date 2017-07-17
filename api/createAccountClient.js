/*
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

var request = require('request');
var _ = require('lodash');
var format = require('util').format;
var config = require('./config/config');

// Default to a secure call to the API endpoint
var defaultOptions = {
  // TODO: update this value with actual/staging api host
  url: config.BASE_URI,
  apiVersion: 2
};

/**
 * The API client class
 * @param options {object} Client options (host url, API version)
 */
function CreateAccountClient (options, oauth) {
  if (!this instanceof CreateAccountClient) {
    return new CreateAccountClient(options);
  }

  // Store the supplied options, using default values if not specified
  this.options = _.defaults({}, options, defaultOptions);
  this.oauth = oauth;
}
module.exports = CreateAccountClient

/**
 * Perform a request to retrieve credit offers for a customer
 * @param customerInfo {object} Represents the customer info to pass to the API
 */
CreateAccountClient.prototype.createAccount = function createAccount (customerInfo, callback) {
  var client = this
  this.oauth.withToken(function (err, token) {
    if (err) { return callback(err) }

    var reqOptions = {
      baseUrl: client.options.url,
      url: '/deposits/account-applications',
      method: 'POST',
      body:customerInfo,
      json: true,
      headers: {
        'Accept': 'application/json; v=' + client.options.apiVersion,
        'content-type': 'application/json'
      },
      auth: {
        bearer: token.access_token
      }
    }
    client._sendRequest(reqOptions, callback)
  })
}

/**
 * A private function to send a request to the API and parse the response, handling errors as needed
 */
CreateAccountClient.prototype._sendRequest = function _sendRequest (reqOptions, callback) {
  request(reqOptions, function (err, response, body) {
    if (err) { return callback(err) }
    if (response.statusCode === 400) {
      return processResponseErrors(body, callback)
    } else if (response.statusCode === 201) {
      parseResponse(body, callback)
    } else {
      var errorMessage = 'Received unexpected status code: ' + response.statusCode
      console.error(errorMessage)
      return callback(new Error(errorMessage))
    }
  })

  function parseResponse (responseBody, callback) {
    if (!responseBody) {
      return callback(null, null)
    }

    try {
      var responseObject = responseBody;
      return callback(null, responseObject)
    } catch (error) {
      return callback(error)
    }
  }

  function processResponseErrors (responseBody, callback) {
    parseResponse(responseBody, function (err, data) {
      if (err) { return callback(err) }

      var errorCode = data.code || '<no code>'
      var errorDescription = data.description || '<no description>'
      var documentationUrl = data.documentationUrl || '<no URL>'
      var message = format('Received an error from the API: code=%s | description=%s | documentation=%s', errorCode, errorDescription, documentationUrl)
      console.error(message)
      callback(new Error(message))
    })
  }
}
