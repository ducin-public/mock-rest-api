var promisify = require("promisify-node")
var fs = promisify("fs")

var json2ts = require('json-schema-to-typescript')
var compileFromFile = json2ts.compileFromFile

function inputFile(file) { return 'schema/' + file + '.schema.json' }
function outputFile(file) { return 'typedef/' + file + '.d.ts' }

var schemas = [
    'book',
    'income-category',
    'income',
    'todo',
    'transfer',
    'user'
]

var promises = schemas.map(function(schemaName){
    return compileFromFile(inputFile(schemaName))
        .then(function(dts){
            return fs.writeFile(outputFile(schemaName), dts)
        })
})

Promise.all(promises)
    .then(function(){
        console.log('Type files generated successfully.')
    })
