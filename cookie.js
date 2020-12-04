var http=require('http');
var cookie=require('cookie');


http.createServer(function(request,response){
    response.writeHead(200,{"Set-Cookie":[`newCookie=this; Max-Age=${60*60}`]});
    response.end("cookie");
}).listen(8080);