var sys = require('sys'), 
http = require('http')
fs = require('fs');
http.createServer(function (req, res) {
	setTimeout(function () {
		var parsedReq = require("url").parse(req.url, true);
		// node must be run from this dir for this to work
		fs.readFile('www' + parsedReq.pathname, function( err, data ) {
			if (err) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write('404');
				res.close();
			} else {
				var ct = 'text/html';
				if (/\.js(on)?$/.test(parsedReq.pathname)) {
					ct = 'text/javascript';
				} else if (/\.css$/.test(parsedReq.pathname)) {
					ct = 'text/css';
				} else {
					// test for images
				}
				res.writeHead(200, {'Content-Type': ct});
				res.write(data);
				res.close();
			}
		});
	}, 200);
}).listen(8000);
sys.puts('Server running at http://127.0.0.1:8000/');
