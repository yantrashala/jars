#!/usr/bin/env node
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var inquirer = require("inquirer");
var colors = require("colors");
var http = require('https');
var fs = require('fs');
var path=require('path');
var parse = require('url-parse');
var program = require("commander");
var printMessage = require('print-message');
//var cmd=require('node-cmd');
var jars = {};

program
  .version('1.0.0')
  .option('-U, --url <path>', 'Artifactory URL')
  .option('-r, --repo <path>', 'Artifactory NPM repository name')
  .option('-s, --scope <path>', 'Artifactory scope')
  .option('-u, --username <path>', 'Artifactory Username to authenticate.')
  .option('-p, --password <path>', 'Artifactory Password to authenticate.')
  .parse(process.argv);

var schema = [
    {
      name: "url",
      type: "input",
      message: colors.cyan("Artifactory URL : "),
      required: true,
      when: !program.url
    },
    {
      name: "repo",
      type: "input",
      message: colors.cyan("Artifactory repository : "),
      required: true,
      when: !program.repo
    },
    {
      name: "scope",
      type: "input",
      message: colors.cyan("Npm Scope : "),
      required: true,
      when: !program.scope
    },
    {
      name: "username",
      type: "input",
      message: colors.cyan("Artifactory Username : "),
      required: true,
      when: !program.username
    },
    {
      name: "password",
      type: "password",
      message: colors.cyan("Artifactory Password : "),
      hidden: true,
      replace: "*",
      required: true,
      when: !program.password
    }
];

printMessage([
    "",
    "Press ^C at any time to quit.",
    ""
]);

jars.setup = function(cb) {
  inquirer.prompt(schema).then(function (data) {
    if(program.url)
      data.url = program.url;
    if(program.repo)
      data.repo = program.repo;
    if(program.scope)
      data.scope = program.scope;
    if(program.username)
      data.username = program.username;
    if(program.password)
      data.password = program.password;

    var options = {};
    url = parse(data.url, true);
    options.hostname = url.hostname;
    options.port = url.port;
    options.path = url.pathname+"/api/npm/"+data.repo+"/auth/"+data.scope;
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
          //console.log('---------chunk--', chunk);
          fs.appendFile(path.join(homePath,'.npmrc'), chunk, function (err) {
             if (err) throw err;
             else {
               console.log("");
               cb(null,"NPM scope successfully added!!!");
             }
          });
        }
    });
  }).end();
}

jars.setup(function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});

module.exports = jars;
