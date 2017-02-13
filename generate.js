var fs = require('fs');
var jsf = require('json-schema-faker');
if (!Promise) {
    var Promise = require('Promise');
}

function readJSONPromise(filename){
    return new Promise((resolve, reject) => {
        fs.readFile(filename, function handleFile(err, data) {
            if (err) {
                reject([err, filename]);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

function writeJSONPromise(filename, json){
    return new Promise((resolve, reject) => fs.writeFile(filename, JSON.stringify(json, null, 2), function(err) {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    }));
}

function appendIds(collection){
    var id = 0;
    collection.forEach(item => item.id = ++id);
    return collection;
}

var arrayGen = count => Array(count).join().split(',').map(x => undefined)
var generateCollection = (schema, count) => arrayGen(count).map(x => jsf(schema))

var filePromises = [
    'data/config.json',
    'data/departments.json',
    'data/bookForms.json',
    'data/bookGenres.json',
    'data/bookTypes.json',
    'schema/user.schema.json',
    'schema/book.schema.json',
    'schema/todo.schema.json'
].map(file => readJSONPromise(file))

// in case single file read fails
filePromises.forEach(p => p.catch(errInfo => console.error("Failed to read file: ", errInfo[1], errInfo[0])));

Promise.all(filePromises)
.then(fileContents => {
    return {
        config: fileContents[0],
        departments: fileContents[1],
        bookForms: fileContents[2],
        bookGenres: fileContents[3],
        bookTypes: fileContents[4],
        users: appendIds(generateCollection(fileContents[5], 500)),
        books: appendIds(generateCollection(fileContents[6], 300)),
        todos: generateCollection(fileContents[7], 30)
    };
}).then(result => writeJSONPromise('db.json', result))
.then(() => console.info("File saved successfully."))
.catch((err) => console.error("File save failed:", err));
