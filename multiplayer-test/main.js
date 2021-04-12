var http = require('http');
var fs = require('fs')
// var myModule = require('./modules');

http.createServer(function (req, res) {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);


// This is unused node js code that will eventully be used