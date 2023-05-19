const http = require("http");
const httpProxy = require("http-proxy");

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//

// Handle error
proxy.on("error", function (err, req, res) {
	res.writeHead(500, {
		"Content-Type": "text/plain",
	});

	res.end(
		"Something went wrong. And we are reporting a custom error message."
	);
});

var server = http.createServer(function (req, res) {
	// You can define here your custom logic to handle the request
	// and then proxy the request.
	//console.log(req);
	if (
		req.url === "/api/v0/add?stream-channels=true&progress=false" &&
		req.method === "POST"
	) {
		proxy.web(req, res, { target: "http://localhost:5001" });
	} else {
		throw Error("URL or method not found!");
	}
});

console.log("listening on port 5050");
server.listen(5050);
