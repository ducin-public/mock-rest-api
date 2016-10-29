var jsonServer = require('json-server');
var pause = require('connect-pause');
var path = require('path');

module.exports = function run(opts){
  var server = jsonServer.create();
  var middlewares = jsonServer.defaults();
  var router = jsonServer.router(path.join(__dirname, opts.dbFile));

  server.use(pause(opts.delayMS));
  server.use(middlewares);
  server.use(router);
  server.listen(opts.port, function () {
    console.log('JSON Server is running');
  });
}
