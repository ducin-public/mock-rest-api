#!/usr/bin/env node
var run = require('../run');
var path = require('path');

var argv = require('yargs') // eslint-disable-line
  .option('file', {
    alias: 'f',
    default: 'db.json'
  })
  .option('delay', {
    alias: 'd',
    default: 1000
  })
  .option('port', {
    alias: 'p',
    default: 3000
  })
  .argv

run({
  dbFile: argv.file,
  delayMS: argv.delay,
  port: argv.port
});
