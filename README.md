# jars

[![Dep Badge](https://david-dm.org/yantrashala/jars.svg)](https://david-dm.org/yantrashala/jars.svg)
[![GitHub issues](https://img.shields.io/github/issues/yantrashala/jars.svg)](https://github.com/yantrashala/jars/issues)

**J**(Frog) **A**(rtifactory) **R**(epository) **S**(etup) is a npm module to ease setup to publish or download scoped node modules from an artifactory.

### Table of contents
* Installation
* Features
* Usage
* Example

#### Installation

```sh
npm install jars -g
```

#### Features

- Prompts to get the Artifactory server url, repository name and scope.
- Prompts for the credentials to be used to access artifactory.
- Runs the curl command using the details provided.
- Sets up .npmrc file for the user.

#### Usage - Configuration
```
$ jars
```

#### Example
```
$ jars
┌───────────────────────────────┐
│                               │
│ Press ^C at any time to quit. │
│                               │
└───────────────────────────────┘
? Artifactory URL :  https://appx.tools.com/artifactory
? Artifactory repository :  npm-release
? Npm Scope :  ideal
? Artifactory Username :  asuran
? Artifactory Password :  ********
```
Once all the correct details are given, it will give the message
'NPM scope successfully added!!!'
