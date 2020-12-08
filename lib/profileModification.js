const { request } = require("http");
var fs=require('fs');

var template={
    html:function(request){
        var content=template.profile(request);
        return `
        <!DOCTYPE html>
            <html>
            <head>
                <title>CaptureMe</title>
                <meta charset="utf-8">
                <link rel="stylesheet" type="text/css" href="../css/default.css">
                <link rel="stylesheet" type="text/css" href="../css/mypage.css">
                <link rel="stylesheet" type="text/css" href="../css/profile.css">
                <link rel="stylesheet" type="text/css" href="../css/imagearr.css">
                <link rel="stylesheet" type="text/css" href="../css/application.css">
            </head>
            <body>
                <header> <!-- 검색 및 네비 -->
                    <span class="CaptureMe"><a href="http://localhost:8080/main">캡쳐미</a></span>
                    <span class="configure">
                        <button><a href="http://localhost:8080/mypage">마이페이지</a></button>
                        <button><a href="http://localhost:8080/logoutPage">logout</a></button>
                    </span><br><br>
                </header>
                <section><!-- 본문 -->
                    <h1><a href="http://localhost:8080/mypage">마이페이지</a></h1>
                    <hr>
                    <br><br>
                    <article>
                        <div class="applicationListContainer">
                            <button class="tabButton" name="profile"><a href="http://localhost:8080/mypage/profile">내 프로필</a></button>
                            <button class="tabButton" name="applicationList"><a href="http://localhost:8080/mypage/applicationList">사진요청 목록</a></button>
                            <button class="tabButton" name="acceptionList"><a href="http://localhost:8080/mypage/acceptionList">요청 수락목록</a></button>
                        </div>
                        <div class="applicationListContainer">
                            <div class="Empty"></div>
                            ${content}
                            <div class="Empty"></div>
                        </div>
                    </article>
                </section>
                <footer class="contactInfo"> <!-- Contact Info... etc -->
                    <p>Copyright ⓒ 2020 captureMe All Rights Reserved</p>
                </footer>
            </body>
            </html>`;
    },
    profile: function (request) {
        var data = fs.readFileSync(`userInfo/${request.session.userId}.json`, 'utf8');
        var userInfo = JSON.parse(data);
        var tpl = `
        <div class="profile tabList">
            <div class="userInfo">
                <img src="${userInfo.photoInfo.profileSrc}" class="profileImage" alt="아직 프로필이 없습니다">
                <div class="userInfoDescription">
                    <div class="profileUserID">${request.session.userId}</div>
                    <div class="uploadCount">게시물 <b>${userInfo.photoInfo.photoSrcAr.length}</b></div>
                    <div class="profileUserName">${userInfo.account.name}</div>
                    <button><a href="http://localhost:8080/profileModification">사진 관리</a></button>
                    <form action="http://localhost:8080/addPhotoPage" method="POST" enctype="multipart/form-data">
                        <input type="file" accept=".png,.jpg" name="photo" required>
                        <input type="submit" value="사진 추가">
                    </form>
                </div>
            </div>
            <div class="column" id="photo">`;
        for (var i = 0; i < userInfo.photoInfo.photoSrcAr.length; i++) {
            tpl += `<figure id="first" style=" flex-direction:column;">
                        <img src="${userInfo.photoInfo.photoSrcAr[i]}">
                        <figcaption style="display:flex;flex-direction:row; justify-content:space-around">
                            <button style="background-color:rgba(0,0,0,0.2); border-color:black";>
                                <a href="http://localhost:8080/profileModificationPage/delete/${i}" style="color:#FF8282">삭제</a>
                            </button>
                            <button style="background-color:rgba(0,0,0,0.2); border-color:black";>
                                <a href="http://localhost:8080/profileModificationPage/setRepresent/${i}">대표사진하기</a>
                            </button>
                            <button style="background-color:rgba(0,0,0,0.2); border-color:black";>
                                <a href="http://localhost:8080/profileModificationPage/setProfile/${i}">프사하기</a>
                            </button>
                        </figcaption>
                    </figure>`;
        }
        tpl += `</div></div>`;

        return tpl;
    }
}
module.exports=template;