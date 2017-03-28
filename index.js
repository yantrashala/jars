#!/usr/bin/env node
var prompt = require('prompt');
var colors = require("colors");
var http = require('http');
var fs = require('fs');
var jars = {};
var path=require('path');
var parse = require('url-parse')

var schema = {
  properties :
  {
    url: {
      description: colors.cyan('Provide Artifactory server url'),
      pattern: /(https?:\/\/[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/,
      required: true
    },
    username: {
      description: colors.cyan('Provide your Artifactory Username'),
      required: true
    },
    password: {
      description: colors.cyan('Provide your Artifactory Password'),
      hidden: true,
      replace: '*',
      required: true
    }
  }
};

jars.setup = function(cb) {
  prompt.start();
  prompt.get(schema, function (err, data) {
    if (err) { cb(err, null); }

    var options = {};
    url = parse(data.url, true);
    options.hostname = url.hostname;
    options.port = url.port;
    options.path = url.pathname;
    options.auth = data.username+":"+data.password;
    jars.httpRequestCall(options, cb);
  });
};

jars.httpRequestCall = function(options, cb){
  var homePath = process.env.HOME || process.env.USERPROFILE;
  http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        var jsonString;
        try {
          jsonString = JSON.parse(chunk);
        } catch(e) {
        }
        if(jsonString && jsonString.errors){
          cb(jsonString.errors[0].message, null);
        } else {
          fs.appendFile(path.join(homePath,'.npmrc'), chunk, function (err) {
             if (err) throw err;
             else {
               console.log('Artifactory setup done successfully!!!');
               cb(null,'DONE');
             }
          });
        }
    });
  }).end();
}

jars.setup(function(err, data) {
  if (err) console.log(err);
  else console.log(data);
  prompt.stop();
});

module.exports = jars;
