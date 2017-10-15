var jsonServer = require('json-server');
var pause = require('connect-pause');
var path = require('path');

module.exports = function run(opts){
  var server = jsonServer.create();
  var middlewares = jsonServer.defaults({
    static: path.join(__dirname, 'node_modules/json-server/lib/server/public/')
  });

  const routes = require('./routes.json')
  const rewriter = jsonServer.rewriter(routes)
  server.use(rewriter)

  var router = jsonServer.router(path.join(__dirname, opts.dbFile));

  server.use((req, res, next) => {
    if (req.query.limit) {
      console.info(`Rewriting limit=${req.query.size} query string param to supported _limit`)
      req.query._limit = req.query.limit
    }
    next()
  })

  server.use(pause(opts.delayMS));
  server.use(middlewares);
  server.use(router);

  server.listen(opts.port, function () {
    console.log('JSON Server is running');
    console.log('open http://localhost:3000');
  });
}
