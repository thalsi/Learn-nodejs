
const http = require("http");

const server = http.createServer((req,res)=>{

    if(req.url==="/"){
        res.writeHead(200, {"Content-type":"text/html" } );
        res.write('hi home page');
        res.end();
    }

    if(req.url==="/get"){
        res.writeHead(200, {"Content-type":"text/html" } );
        res.write('hi Get page');
        res.end();
    }


});


const PORT=3000;

server.listen(PORT,(err)=> console.log('server running on '+PORT) );

