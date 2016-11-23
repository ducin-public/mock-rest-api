var jsonServer = require('json-server');
var pause = require('connect-pause');
var path = require('path');

module.exports = function run(opts){
  var server = jsonServer.create();
  var middlewares = jsonServer.defaults({
    static: path.join(__dirname, 'node_modules/json-server/src/server/public/')
  });
  var router = jsonServer.router(path.join(__dirname, opts.dbFile));

  server.use(pause(opts.delayMS));
  server.use(middlewares);
  server.use(router);
  server.listen(opts.port, function () {
    console.log('JSON Server is running');
    console.log('open http://localhost:3000');
  });
}
