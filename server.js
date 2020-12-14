var fs = require("fs");
var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var upload = multer({ dest: 'public/photo/'})
var mypageTemplate = require('./lib/mypage');
var profileModificationTemplate=require('./lib/profileModification');
var photoApplyTemplate=require('./lib/photoApply');
var detail=require('./lib/detail');
var main=require('./lib/main');
const photoApply = require("./lib/photoApply");
var db=require('./lib/db');



var app = express();
var port = 8080;
function checkApplyUser(request) {
    var data = fs.readFileSync(`userInfo/${request.body.id}.json`, 'utf8');
    var userInfo = JSON.parse(data);
    return userInfo.account.password == request.body.password;
}
function athentication(request) {
    return request.session.is_logined;
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "aa",
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))

app.get('/', function (request, response) {
    fs.readFile('public/html/login.html', function (err, data) {
        if (err) throw err;
        response.send(data.toString());

    })
})

app.post('/loginPage', function (request, response) {
    if (checkApplyUser(request)) {
        request.session.is_logined = true;
        request.session.userId = request.body.id;
        response.writeHead(302, { Location: `/main` });
        response.send();
    }
    else {
        response.writeHead(302, { Location: `/` });
        response.send();
    }

})

app.get('/mypage', function (request, response) {
    if (!athentication(request)) { return false; }
    response.send(mypageTemplate.html(request));
})
app.get('/mypage/:pageId', function (request, response) {
    if (!athentication(request)) { return false; }
    response.send(mypageTemplate.html(request));
})

app.get(`/mypage/:pageId/:num/:decide`, function (request, response) {
    if (!athentication(request)) { return false; }
    var data = fs.readFileSync(`userInfo/${request.session.userId}.json`, "utf8");
    var userInfo = JSON.parse(data);
    var accept = userInfo.application.splice(request.params.num, 1)[0];
    if (request.params.decide == 'accept') {
        userInfo.acception.push(accept);
    }
    fs.writeFile(`userInfo/${request.session.userId}.json`, JSON.stringify(userInfo), 'utf8', function (err) {
        if (err) throw err;
    })
    response.writeHead(302, { Location: `/mypage/${request.params.pageId}` });
    response.send();
})

app.get(`/complete/:pageId/:num`, function (request, response) {
    if (!athentication(request)) { return false; }

    var data = fs.readFileSync(`userInfo/${request.session.userId}.json`, "utf8");
    var userInfo = JSON.parse(data);
    userInfo.acception.splice(request.params.num, 1);
    fs.writeFile(`userInfo/${request.session.userId}.json`, JSON.stringify(userInfo), 'utf8', function (err) {
        if (err) throw err;
    })
    response.writeHead(302, { Location: `/mypage/${request.params.pageId}` });
    response.send();
})

app.get('/profileModification', function (request, response) {
    if (!athentication(request)) { return false; }
    response.send(profileModificationTemplate.html(request));
})

app.get('/profileModificationPage/delete/:num', function (request, response) {
    if (!athentication(request)) { return false; }
    var data=fs.readFileSync(`userInfo/${request.session.userId}.json`);
    var userInfo=JSON.parse(data);
    db.query(`SELECT * FROM test_image WHERE representSrc=? OR profileSrc=?`,[userInfo.photoInfo.photoSrcAr[request.params.num],userInfo.photoInfo.photoSrcAr[request.params.num]],function(err,data){
        if(err){throw err;}
        if(data.length!=0){
            response.redirect(`/profileModification/error`);
        }
        else{
            db.query(`DELETE FROM test_detail WHERE detailSrc=? `,[userInfo.photoInfo.photoSrcAr[request.params.num]],function(err2,data){
                if (err2){throw err2;}
                userInfo.photoInfo.photoSrcAr.splice(request.params.num,1);
                fs.writeFileSync(`userInfo/${request.session.userId}.json`,JSON.stringify(userInfo),'utf8');
                response.writeHead(302, { Location: `/profileModification` });
                response.send();
            });
        }
    })
})

app.get('/profileModification/error',function(request,response){
    response.send('<script type="text/javascript">alert("대표사진 또는 프로필 사진을 바꿔주세요");window.location="/profileModification"</script>')
})

app.get('/profileModificationPage/setRepresent/:num', function (request, response) {
    if (!athentication(request)) { return false; }
    var data=fs.readFileSync(`userInfo/${request.session.userId}.json`,"utf8");
    var userInfo=JSON.parse(data);
    var len=userInfo.photoInfo.detailSrcAr.length;
    userInfo.photoInfo.detailSrcAr[len]=userInfo.photoInfo.photoSrcAr[request.params.num];
    fs.writeFileSync(`userInfo/${request.session.userId}.json`,JSON.stringify(userInfo),'utf8');
    db.query(`SELECT * FROM test_image WHERE id=?`,[request.session.userId],function(err,data){
        if (err){throw err; }
        console.log(data);
        if (data.length==0){
            console.log('empty');
            console.log(data);
            db.query(`INSERT INTO test_image (id,representSrc) VALUES(?,?)`,[request.session.userId,userInfo.photoInfo.photoSrcAr[request.params.num]],function(err2,data){
                if(err2){throw err2}
            }); 
        } else{
            db.query(`UPDATE test_image SET representSrc=? WHERE id=?`,[userInfo.photoInfo.photoSrcAr[request.params.num],request.session.userId],function(err3,data){
                if(err3){throw err3}
            }); 
            console.log('not empty');
            console.log(data);
        }
    });
    response.writeHead(302, { Location: `/profileModification` });
    response.send();
})

app.get('/profileModificationPage/setProfile/:num', function (request, response) {
    if (!athentication(request)) { return false; }
    var data=fs.readFileSync(`userInfo/${request.session.userId}.json`);
    var userInfo=JSON.parse(data);
    userInfo.photoInfo.profileSrc=userInfo.photoInfo.photoSrcAr[request.params.num];
    fs.writeFileSync(`userInfo/${request.session.userId}.json`,JSON.stringify(userInfo),'utf8');
    db.query(`SELECT * FROM test_image WHERE id=?`,[request.session.userId],function(err,data){
        if (err){throw err; }
        if (data.length==0){
            db.query(`INSERT INTO test_image (id,profileSrc) VALUES(?,?)`,[request.session.userId,userInfo.photoInfo.profileSrc],function(err2,data){
                if(err2){throw err2;}
            }); 
        } else{
            db.query(`UPDATE test_image SET profileSrc=? WHERE id=?`,[userInfo.photoInfo.profileSrc,request.session.userId],function(err3,data){
                if(err3){throw err3;}
            }); 
        } 
    });
    response.writeHead(302, { Location: `/profileModification` });
    response.send();
})

app.post('/addPhotoPage', upload.single('photo'),function(request,response){
    if (!athentication(request)) { return false; }
    var data=fs.readFileSync(`userInfo/${request.session.userId}.json`);
    var userInfo=JSON.parse(data);
    var len=userInfo.photoInfo.photoSrcAr.length;
    var src=`../photo/${request.file.filename}`;
    userInfo.photoInfo.photoSrcAr[len]=src;
    db.query(`INSERT INTO test_detail (id,detailSrc) VALUES(?,?)`,[request.session.userId,src],function(err,result){
        fs.writeFileSync(`userInfo/${request.session.userId}.json`,JSON.stringify(userInfo),'utf8');
        response.writeHead(302, { Location: `/profileModification` });
        response.send();
    });
})

app.get('/photoApply/:id',function(request,response){
    if (!athentication(request)) { return false; }
    response.send(photoApplyTemplate.html(request));
})

app.post('/photoApplyPage/:id',function(request,response){
    if (!athentication(request)) { return false; }
    var data=fs.readFileSync(`userInfo/${request.params.id}.json`);
    var userInfo=JSON.parse(data);
    var body=request.body;
    userInfo.application[userInfo.application.length]={
            id: request.session.userId,
            time: body.time,
            location: body.location
    }
    fs.writeFileSync(`userInfo/${request.params.id}.json`,JSON.stringify(userInfo),'utf8');
    response.writeHead(302, { Location: `/${request.params.id}` });
    response.send();
})

app.get('/apply', function (request, response) {
    fs.readFile('public/html/apply.html', function (err, data) {
        if (err) throw err;
        response.send(data.toString());
    })
})

app.post('/applyPage', function (request, response) {
    var data=fs.readFileSync('userInfo/_ui.json','utf8');
    var body=JSON.parse(data);
    body.account=request.body;
    db.query(`INSERT INTO test (id,password,name,phoneNumber) VALUES(?,?,?,?)`,[body.account.id,body.account.password,body.account.name,body.account.phoneNumber],function(err,data){
        if(err){throw err}
        fs.writeFile(`./userInfo/${body.account.id}.json`, JSON.stringify(body), 'utf8', function (err) {
            if (err) throw err;
            response.writeHead(302, { Location: `/` });
            response.send();
        });
    });
})

app.get('/logoutPage', function (request, response) {
    request.session.destroy();
    response.writeHead(302, { Location: `/` });
    response.send();
})

app.get('/main', function (request, response) {
    if (!athentication(request)) { return false; }
        main.html(request,response);
})

app.get('/search',function(request,response){
    if (!athentication(request)) { return false; }
    var id=request.query.search
    console.log(request.query.search);
    main.searchpage(request,id,response)
})

app.get('/main/:pagenum', function (request, response) {
    if (!athentication(request)) { return false; }
        var pagenum=request.params.pagenum
        main.pagehtml(request,pagenum,response);
})

app.get('/:pageId', function (request, response) {
    if (!athentication(request)) { return false; }
    var id=request.params.pageId;
    detail.html(request,id,response);
})

app.listen(port, function () {
    console.log("server is running at " + port + " port");
})