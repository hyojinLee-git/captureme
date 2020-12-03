var http = require('http');
var fs = require('fs');
var url=require('url');
var qs=require('querystring');
var mysql=require('mysql');
var db=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'1111',
    database:'captureme'
  });
db.connect();

var app=http.createServer(function(request,response){
    var _url=request.url;
    var queryData=url.parse(_url,true).query;
    var pathname=url.parse(_url,true).pathname;
    if (pathname=='/'){
        var html=`hello world`;
        response.writeHead(200);
        response.end(html);
    } else if(pathname=='/apply'){
        var html=`<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Apply</title>
            
            <script>
                function apply() {
                    var id = document.getElementsByClassName('input')[0];
                    var password = document.getElementsByClassName('input')[1];
                    var name = document.getElementsByClassName('input')[2];
                    var phonenumber = document.getElementsByClassName('input')[3];
        
                    if (id.value == '' || id.value.length < 5) {
                        alert("id는 5자리 이상으로 설정하세요");
                        id.focus();
                    } else if (password.value == "") {
                        alert("비밀번호를 입력하세요");
                        password.focus();
                    } else if (name.value == "") {
                        alert("이름을 입력하세요");
                        name.focus();
                    } else if (phonenumber.value == "") {
                        alert("전화번호를 입력하세요");
                        address.focus();
                    } else {
                        var or = confirm("가입하시겠습니까?");
                        if (or == true) {
                            // alert('로그인하세요');
                            document.location = 'login.html';
                        } else {
        
                        }
                    }
        
        }
            </script>
        </head>
        <body>
            <div class="apply">
                <div><h2>회원가입</h2></div>
                <form action="/apply_process" method="post">
                <table>
                    <tr>
                        <td>아이디</td>
                        <td><input type="text" class="input" name="id" placeholder="ID"></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input type="text" class="input" name="password" placeholder="password"></td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td><input type="text" class="input" name="name"></td>
                    </tr>
                    <tr>
                        <td>연락처</td>
                        <td><input type="text" class="input" name="phone"></td>
                    </tr>
                </table>
                
                <button class="submit" onclick="apply()">가입하기</button>
                <form>
            </div>
        </body>
        </html>`;
        response.writeHead(200);
        response.end(html);
    } else if(pathname=="/apply_process"){
        var body='';
        request.on('data',function(data){
            body=body+data;
        });
        request.on('end',function(){
            var post=qs.parse(body);
            db.query(`INSERT INTO test (id,password,name,phone) 
            VALUES(?,?,?,?)`,[post.id,post.password,post.name,post.phone],function(err,result){
                if (err){
                throw err;
                } 
                response.writeHead(302,{Location:`/apply`});
            response.end();
                }); 
            
            }); 
    }
    else{
        response.writeHead(404);
        response.end('Not Found');
    }
});
app.listen(8080);