/*!
 * Simple Web Server
 * 
 * Copyright (c) 2011 Jacob Swartwood
 */

var sys = require('sys'), 
	http = require('http'),
	fs = require('fs');

var PATH_TO_WWW = "www";

http.createServer(function (req, res) {
	setTimeout(function () {
		var reqPath = require("url").parse(req.url, true).pathname;
		// Fix this test to do an actual fs test if path is a dir
		if (/\/$/.test(reqPath)) {
			reqPath = reqPath + "index.html";
		}
		
		fs.readFile(PATH_TO_WWW + reqPath, function( err, data ) {
			if (err) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write('404: ' + reqPath);
				res.end();
			} else {
				var ct = 'text/html';
				if (/\.js(on)?$/.test(reqPath)) {
					ct = 'text/javascript';
				} else if (/\.css$/.test(reqPath)) {
					ct = 'text/css';
				} else {
					// test for images
				}
				res.writeHead(200, {'Content-Type': ct});
				res.write(data);
				res.end();
			}
		});
	}, 200);
}).listen(8000);
sys.puts('Server running at http://127.0.0.1:8000/');
