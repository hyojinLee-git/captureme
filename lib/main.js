var db=require('./db.js');
var imagetemp=require('./imagetemplate');


module.exports={
    html:function(request,response){
        db.query(`SELECT test.id,name,profileSrc,representSrc FROM test LEFT JOIN test_image ON test_image.id=test.id WHERE NOT representSrc is NULL`,function(err,boardnum){
        db.query(`SELECT test.id,name,profileSrc,representSrc FROM test LEFT JOIN test_image ON test_image.id=test.id WHERE NOT representSrc is NULL LIMIT 0,2;`,function(err,userinfo){
            if(err){throw err}
            
                    //console.log(username)
                    //if (userinfo.profileSrc==null){console.log(username)}
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
                            <li><a href="http://localhost:8080/mypage" >마이페이지</a></li>
                            <li><a href="http://localhost:8080/logoutPage">logout</a></li>
                        </ul>
                    </div>
                </header>
                <section id="main">
                    <div class="column" id="photo">
                        ${imagetemp.maintemplate(userinfo)}
                    <!--page number-->
                    <!--서버에서 처리-->
                    <div class="page_number">
                        <!--<input type="button" value="<">-->
                        ${imagetemp.numbertemplate(boardnum.length)}
                        <!--<input type="button" value=">">-->
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

    },
    pagehtml:function(request,pagenum,response){
        pagenum=parseInt(pagenum);
        var startnum=(pagenum-1)*2; //(pagenum-1)*게시글 개수
        var nextpage=pagenum+1;
        var prevpage=pagenum-1
        db.query(`SELECT test.id,name,profileSrc,representSrc FROM test LEFT JOIN test_image ON test_image.id=test.id WHERE NOT representSrc is NULL`,function(err,boardnum){
        db.query(`SELECT test.id,name,profileSrc,representSrc FROM test LEFT JOIN test_image ON test_image.id=test.id WHERE NOT representSrc is NULL LIMIT ${startnum},2;`,function(err,userinfo){
            if(err){throw err}
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
                    <div class=";search">
                        <input type="text" id='searchbar'>
                        <button class="icon-search"></button>
                    </div>
                    <div class="configure">
                        <ul>
                            <!-- <li class="none">I Need</li> -->
                            <li><a href="photographer" class="toggle_button">I Need </a></li>
                            <li><a href="http://localhost:8080/mypage" >마이페이지</a></li>
                            <li><a href="http://localhost:8080/logoutPage">logout</a></li>
                        </ul>
                    </div>
                </header>
                <section id="main">
                    <div class="column" id="photo">
                        ${imagetemp.maintemplate(userinfo)}
                    <!--page number-->
                    <!--서버에서 처리-->
                    <div class="page_number">
                        <!--<a href="http://localhost:8080/main/${prevpage}"><input type="button" value="<"></a>-->
                        ${imagetemp.numbertemplate(boardnum.length)}
                        <!--<a href="http://localhost:8080/main/${nextpage}"><input type="button" value=">"></a>-->
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
    }

}