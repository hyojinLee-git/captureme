var temp=require('./imagetemplate');
var db=require('./db.js');

module.exports={
    html: function(request,id,response){
        db.query(`SELECT test_detail.detailSrc FROM test_image LEFT JOIN test_detail ON test_image.id=test_detail.id WHERE test_image.id=?`,[id],function(err,image){
            if (err) {
                throw err;
            }
           var data= `
            <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Detail</title>
            <link rel="stylesheet" href="../css/fontello-840194d4/css/fontello.css">
            <link rel="stylesheet" href="../css/detail.css">
            <link rel="stylesheet" href="../css/default.css">
            <link rel="stylesheet" href="../css/header.css">
            
        
        </head>
        <body>
            <header id="header">
                ${temp.headertemplate()}
            </header>
            <section id="main">
                <div class="slideshow-container">
                    ${temp.detailtemplate(image,id)}
                    
                    <a class="prev" onclick="plusSlides(-1)"><img src="../img/free-icon-left-arrow-271220.png"></a>
                    <a class="next" onclick="plusSlides(1)"><img src="../img/free-icon-right-arrow-271228.png"></a>
                    
                </div>
                <br>
                <div style="text-align:center">
                    ${temp.dottemplate(image)}
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
    }
}