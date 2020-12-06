var express=require('express');
var multer=require('multer');


var app=express();
var upload = multer({ dest: 'test/' })

app.get(`/`,function(request,response){
    response.send(`<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Apply</title>
    </head>
    <body>
        <form action="http://localhost:8080/file" method="post" enctype="multipart/form-data">
            <input type="file" name="userName">
            <input type="submit" value="전송">
        </form>
    </body>
    </html>`);
})
app.post('/file',upload.single('userName'),function(request,response){
    console.log(request.file);
    response.send();
});
app.listen(8080,function(){
    console.log("server is running");
})