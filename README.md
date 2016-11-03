# mock REST API

This repository holds a simple mock REST API that might be used for rapid SPA development.
Especially, when there's no need to focus on the API itself - this one comes for free :)

## install

fetch dependencies:

    npm install

## execute

start REST API in your console:

    npm start

you should see something similar to this:

    JSON Server is running

or this:

        Loading db.json
        Done

        Resources
        http://localhost:3000/config
        http://localhost:3000/users
        http://localhost:3000/todos

        Home
        http://localhost:3000

Important:

 * the data is loaded from `db.json` and stored in-memory by the OS process
 * upon process termination (ctrl-C), modified data is dumped back to `db.json`
 * if you want to restart with clear data, use git to clear local changes (e.g. `git checkout db.json`) before running `npm start` back

## (re)generate data

Use this command:

    npm run generate

to easily (re)generate entire database.

Additionally, you can add:

 * new static files to `data` directory
 * new JSON Schema files to `schema` directory

You can also adapt `generate.js` file where you define size of the collection, filepaths, etc.   

## software used

 * [`json-schema-faker`](https://github.com/json-schema-faker/json-schema-faker)
 * [`json-server`](https://github.com/typicode/json-server), read more at:
   * https://www.sitepoint.com/mock-rest-apis-using-json-server
   * https://egghead.io/lessons/nodejs-creating-demo-apis-with-json-server
