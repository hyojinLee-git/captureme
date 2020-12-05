var fs=require("fs");
var express=require("express");
var bodyParser=require('body-parser');
var session=require('express-session');
var FileStore=require('session-file-store')(session);
var mypageTemplate=require('./lib/mypage');
const { request } = require("express");

var app=express();
var port=8080;

function checkApplyUser(request){
    var fileList=fs.readdirSync('userInfo','utf8');
    for(var i=0;i<fileList.length&&fileList[i]==request.body.id+'.json';i++){
        var data=fs.readFileSync(`userInfo/${fileList[i]}`,'utf8');
        var userInfo=JSON.parse(data);
        if(userInfo.account.password==request.body.password){
            return true;
        }
    }
    return false;
}
function athentication(request){
    return request.session.is_logined;
}


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret:"aa",
    resave:false,
    saveUninitialized:true,
    store:new FileStore()
}))

app.get('/',function(request,response){
    fs.readFile('public/html/login.html',function(err,data){
        if(err)throw err;
        response.send(data.toString());
        
    })
})

app.post('/loginPage',function(request,response){
    //계정확인 성공 -> 세션에 로그인 이력 기록하고 main 페이지로 이동
    //계정확인 실패 -> 로그인 실패 알람 띄우고 다시 로그인 페이지로 이동
    //sql로 수정
    if(checkApplyUser(request)){
        request.session.is_logined=true;
        request.session.userId=request.body.id;
        response.writeHead(302,{Location:`/main`});
        response.send();
    }
    else{
        response.writeHead(302,{Location:`/`});
        response.send();
    }
    
})

app.get('/main',function(request,response){
    if(!athentication(request)){return false;}
    fs.readFile('public/html/main.html',function(err,data){
        if(err)throw err;
        response.send(data.toString());
    })
})

app.get('/mypage',function(request,response){
    if(!athentication(request)){return false;}
    response.send(mypageTemplate.html(request));
})
app.get('/mypage/:pageId',function(request,response){
    if(!athentication(request)){return false;}
    response.send(mypageTemplate.html(request));
})

app.get('/detail',function(request,response){
    if(!athentication(request)){return false;}
    fs.readFile('public/html/detail.html',function(err,data){
        if(err)throw err;
        response.send(data.toString());
    })
})
app.get('/apply',function(request,response){
    fs.readFile('public/html/apply.html',function(err,data){
        if(err)throw err;
        response.send(data.toString());
    })
})
app.post('/applyPage',function(request,response){
    var body={account:request.body};
    //sql로 수정
    fs.writeFile(`./userInfo/${body.account.id}.json`,JSON.stringify(body),'utf8',function(err){
        if(err)throw err;
        response.writeHead(302,{Location:`/`});
        response.send();
    })
})
app.get('/logoutPage',function(request,response){
    request.session.destroy();
    response.writeHead(302,{Location:`/`});
    response.send();
})

app.listen(port,function(){
    console.log("server is running at "+port+" port");
})