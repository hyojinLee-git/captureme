var mysql=require('mysql');
var imagetemp=require('./imagetemplate');
var db=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'1111',
    database:'captureme'
  });
db.connect();

module.exports={
    
    html:function(request,response){
        db.query(`SELECT COUNT(*) FROM test`,function(err,cnt){
            if (err){
                throw err;
            }
            db.query(`SELECT id FROM test`,function(err2,user){
                if(err2){throw err2}
            
                db.query(`SELECT representSrc FROM test_image`,function(err,represent){
                    db.query(`SELECT profileSrc FROM test_image`,function(err,profile){
        var data= `
        <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capture Me</title>
    <link rel="stylesheet" href="../css/fontello-840194d4/css/fontello.css">
    
    <link rel="stylesheet" href="../css/default.css">
    <link rel="stylesheet" href="../css/main.css" />
    <link rel="stylesheet" href="../css/header.css">
</head>
<body>
    <header id="header">
        <div class="CaptureMe"><a href="/main">캡쳐미</a></div>
        <div class="search">
            <input type="text" id='searchbar'>
            <button class="icon-search"></button>
        </div>
        <div class="configure">
            <ul>
                <!-- <li class="none">I Need</li> -->
                <li><a href="photographer" class="toggle_button">I Need </a></li>
                <li><a href="mypage" >마이페이지</a></li>
                <li><a href="http://localhost:8080/logoutPage">logout</a></li>
            </ul>
        </div>
    </header>
    <section id="main">
        <div class="column" id="photo">
            ${imagetemp.template(cnt,user,represent,profile)}
        <!--page number-->
        <!--서버에서 처리-->
        <div class="page_number">
            <input type="button" value="<">
            <input type="button" value="1">
            <a href='main_page2.html'><input type="button" value="2"></a>
            <input type="button" value="3">
            <input type="button" value=">">
        </div>
    </section>
    <footer class="contactInfo">
        <div>Copyright ⓒ 2020 captureMe All Rights Reserved</div>
    </footer>
</body>
</html>
        `

    response.send(data);
});
});
});
});
    }

}