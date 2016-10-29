#!/usr/bin/env node
var run = require('../run');
var path = require('path');

run({
  dbFile: 'db.json',
  delayMS: 1000,
  port: 3000
});
