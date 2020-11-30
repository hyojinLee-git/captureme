var http=require("http");
var fs=require("fs");
var url=require("url");
var express=require("express");
var path=require("path");

var app=express();
app.use(express.static(path.join(__dirname,'/public')));
var port=8080;
app.listen(port,function(){
    console.log("뿅");
})