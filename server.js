var http=require("http");
var fs=require("fs");
var url=require("url");
var express=require("express");
var path=require("path");
var bodyParser=require('body-parser');

var app=express();
var port=8080;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(request,response){
    fs.readFile('public/html/login.html',function(err,data){
        if(err)throw err;
        response.send(data.toString());
    })
})

app.post('/loginPage',function(request,response){
    var id=request.body.id;
    var pw=request.body.password;
    //계정확인 성공 -> 세션에 로그인 이력 기록하고 main 페이지로 이동
    //계정확인 실패 -> 로그인 실패 알람 띄우고 다시 로그인 페이지로 이동

    if(id=="12345"&&pw=="11"){
        //sessionStorage.setItem("id",id); 안댐
        response.writeHead(302,{Location:`/main`});
        response.send();
    }
    else{
        response.writeHead(302,{Location:`/`});
        response.send();
    }
})

app.get('/main',function(request,response){
    fs.readFile('public/html/main.html',function(err,data){
        if(err)throw err;
        response.send(data.toString());
    })
})

app.listen(port,function(){
    console.log("뿅");
})