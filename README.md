# jars

[![Build status](https://travis-ci.org/yantrashala/jars.svg)](https://travis-ci.org/yantrashala/jars)
[![Dep Badge](https://david-dm.org/yantrashala/jars.svg)](https://david-dm.org/yantrashala/jars.svg)
[![GitHub issues](https://img.shields.io/github/issues/yantrashala/jars.svg)](https://github.com/yantrashala/jars/issues)


**J**(Frog) **A**(rtifactory) **R**(epository) **S**(etup) is a npm module to ease setup of registries for artifactory.

### Table of contents
* Installation
* Features
* Usage
* Example
* TestCases

#### Installation

```sh
npm install jars -g
```

#### Features

- Prompts to get all the Artifactory server url.
- Also prompts for the credentials to be used to access the artifactory.
- Runs the curl command using the details provided.
- Sets up the .npmrc file for the user.

#### Usage - Configuration
```
$ jars
```

#### Example
```
$ jars
Provide Artifactory server url:  http://jfrogserver:8081/artifactory/api/npm/npm-release/auth/scope
Provide your Artifactory Username : admin
Provide your Artifactory Password : ********
```
Once all the correct details are given, it will give the message
'Artifactory setup done successfully!!!'

#### TestCases
For running the testcases correctly, below are the pre-requisites.
- Jfrog Artifactory locally installed and running on your local on port no 8088.
- default login credentials should be admin/password.
- Create npm local repositories in the JFrog artifactory with name 'npm-release'.
