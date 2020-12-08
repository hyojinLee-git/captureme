var fs = require("fs");
var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var upload = multer({ dest: 'public/photo/'})
var mypageTemplate = require('./lib/mypage');
var profileModificationTemplate=require('./lib/profileModification');

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

app.get('/main', function (request, response) {
    if (!athentication(request)) { return false; }
    fs.readFile('public/html/main.html', function (err, data) {
        if (err) throw err;
        response.send(data.toString());
    })
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
    userInfo.photoInfo.photoSrcAr.splice(request.params.num,1);
    fs.writeFileSync(`userInfo/${request.session.userId}.json`,JSON.stringify(userInfo),'utf8');
    
    response.writeHead(302, { Location: `/profileModification` });
    response.send();
})
app.get('/profileModificationPage/setRepresent/:num', function (request, response) {
    if (!athentication(request)) { return false; }
    var data=fs.readFileSync(`userInfo/${request.session.userId}.json`);
    var userInfo=JSON.parse(data);
    var len=userInfo.photoInfo.detailSrcAr.length;
    if(len<=2){
        userInfo.photoInfo.detailSrcAr[len]=userInfo.photoInfo.photoSrcAr[request.params.num];
        fs.writeFileSync(`userInfo/${request.session.userId}.json`,JSON.stringify(userInfo),'utf8');
        response.writeHead(302, { Location: `/profileModification` });
        response.send();
    }
    else{
        response.writeHead(302, { Location: `/profileModification` });
        response.send();
    }
})
app.get('/profileModificationPage/setProfile/:num', function (request, response) {
    if (!athentication(request)) { return false; }
    var data=fs.readFileSync(`userInfo/${request.session.userId}.json`);
    var userInfo=JSON.parse(data);
    userInfo.photoInfo.profileSrc=userInfo.photoInfo.photoSrcAr[request.params.num];
    fs.writeFileSync(`userInfo/${request.session.userId}.json`,JSON.stringify(userInfo),'utf8');
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
    fs.writeFileSync(`userInfo/${request.session.userId}.json`,JSON.stringify(userInfo),'utf8');
    response.writeHead(302, { Location: `/profileModification` });
    response.send();
})

app.get('/detail', function (request, response) {
    if (!athentication(request)) { return false; }
    fs.readFile('public/html/detail.html', function (err, data) {
        if (err) throw err;
        response.send(data.toString());
    })
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

    fs.writeFile(`./userInfo/${body.account.id}.json`, JSON.stringify(body), 'utf8', function (err) {
        if (err) throw err;
        response.writeHead(302, { Location: `/` });
        response.send();
    })
})
app.get('/logoutPage', function (request, response) {
    request.session.destroy();
    response.writeHead(302, { Location: `/` });
    response.send();
})

app.listen(port, function () {
    console.log("server is running at " + port + " port");
})