var args = process.argv.splice(2);
var http = require('http');
var fs = require('fs');
var path = require('path');
http.createServer(function(req,res) {
	if(req.url == '/') {
		fs.readFile('./public/serindex1.html' , 'UTF-8', function(err, data) {
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.end(data);
		});
	} else if(req.url.match('\.css$')) {
			 var cssPath = path.join(__dirname, 'public', req.url);
			 var fileStream = fs.createReadStream(cssPath, 'UTF-8');
			 res.writeHead(200, {'Content-Type' : 'text/css'} )
			 fileStream.pipe(res);
	} else if(req.url.match('\.js$')) {
		var jsPath = path.join(__dirname, 'public', req.url);
		var fileStream = fs.createReadStream(jsPath, 'UTF-8');
		res.writeHead(200, {'Content-Type' : 'text/js'} );
		fileStream.pipe(res);
	}else if(req.url.match('\.gif$')) {
		var imgPath = path.join(__dirname, 'public', req.url);
		var fileStream = fs.createReadStream(imgPath);
		res.writeHead(200, {'Content-Type' : 'image/gif'} );
		fileStream.pipe(res);
	}else{
		res.writeHead(400, {'Content-Type' : 'text/html'});
		res.end('Page not Found');
	}
	
}).listen(args[0] || 8000);