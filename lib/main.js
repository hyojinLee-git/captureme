var db=require('./db.js');
var imagetemp=require('./imagetemplate');


module.exports={
    html:function(request,response){
        db.query(`SELECT COUNT(*) FROM test_image`,function(err,cnt){
            if (err){throw err}
            db.query(`SELECT id FROM test_image`,function(err2,user){
                if(err2){throw err2}
                db.query(`SELECT representSrc,profileSrc FROM test_image`,function(err3,imageSrc){
                    if(err3){throw err3}
                    db.query(`SELECT name FROM test LEFT JOIN test_image ON test_image.id=test.id;`,function(err4,username){
                        if(err4){throw err4}
                    //console.log(imageSrc)
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
                        ${imagetemp.template(cnt,user,username,imageSrc)}
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