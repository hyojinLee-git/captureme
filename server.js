var fs = require("fs");
var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var upload = multer({ dest: 'public/photo/' })
var mypageTemplate = require('./lib/mypage');
var profileModificationTemplate=require('./lib/profileModification');
var detail=require('./lib/detail');



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
    var len=userInfo.photoInfo.detailSrc.length;
    console.log("len:"+len);
    if(len<=2){
        userInfo.photoInfo.detailSrc[len]=userInfo.photoInfo.photoSrcAr[request.params.num];
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
app.post('/addPhotoPage',function(request,response){
    if (!athentication(request)) { return false; }
    console.log(request.body.photo);
    response.send(request.body.photo);
})









var mysql=require('mysql');
var db=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'1111',
    database:'captureme'
  });
db.connect();



app.get('/detail/:pageId', function (request, response) {
    if (!athentication(request)) { return false; }
    var id=request.params.pageId;
    db.query(`SELECT test_detail.detailSrc FROM test_image LEFT JOIN test_detail ON test_image.id=test_detail.id WHERE test_image.id=?`,[id],function(err,image){
        if (err) {
            console.log(err);
        }
        console.log(image);
       var data= `
        <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Detail</title>
        <link rel="stylesheet" href="../css/detail.css">
        <!-- <link rel="stylesheet" href="../css/main.css"> -->
        <link rel="stylesheet" href="../css/default.css">
        <link rel="stylesheet" href="../css/header.css">
        
    
    </head>
    <body>
        <header id="header">
            <span class="CaptureMe"><a href="main">캡쳐미</a></span>
            <div class="search">
                <input type="text" id='searchbar'>
                <input type="button" value="검색">
            </div>
            <div class="configure">
                <a href="photographer"><input type="button" value="사진사" id="toggle_button"></a>
                <ul>
                    <li><a href="mypage">마이페이지</a></li>
                    <li><a href="#">알림</a></li>
                    <li><a href="logoutPage">logout</a></li>
                </ul>
            </div>
        </header>
        <section id="main">
            <div class="slideshow-container">
                <div class="mySlides fade">
                    <img class="item image" src="${image[0].detailSrc}" style="height:100%">
                    <div class="item description">
                        <div class="text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi pariatur voluptas magni, distinctio non quos sequi illo ratione quibusdam quidem ipsum labore illum officia recusandae ducimus rerum hic ab officiis!</div>
                        <a href="#" class="apply"><input type="button" value="신청하기"></a>
                    </div>
                </div>
                
                <div class="mySlides fade">
                    <img class="item image" src="${image[1].detailSrc}" style="height:100%">
                    <div class="item description">
                        <div class="text">Caption Two</div>
                        <a href="#" class="apply"><input type="button" value="신청하기"></a>
                    </div>
                </div>
                
                <div class="mySlides fade">
                    <img class="item image" src="${image[2].detailSrc}" style="height:100%">
                    <div class="item description">
                        <div class="text">Caption Three</div>
                        <a href="#" class="apply"><input type="button" value="신청하기"></a>
                    </div>
                </div>
                
                <a class="prev" onclick="plusSlides(-1)"><img src="../img/free-icon-left-arrow-271220.png"></a>
                <a class="next" onclick="plusSlides(1)"><img src="../img/free-icon-right-arrow-271228.png"></a>
                
            </div>
            <br>
            <div style="text-align:center">
                <span class="dot" onclick="currentSlide(1)"></span> 
                <span class="dot" onclick="currentSlide(2)"></span> 
                <span class="dot" onclick="currentSlide(3)"></span> 
            </div>
        </section>
        <footer class="contactInfo">
            <div>Copyright ⓒ 2020 captureMe All Rights Reserved</div>
        </footer>
            <!--script-->
            <script type="text/javascript" src="../js/slide.js"></script>
    </body>
    </html>
        `
        //console.log(id);
        response.send(data);

    });
    
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