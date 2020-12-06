
/*
<div class="profile tabList">
    <div class="userInfo">
        <img src="../img/userPhoto/test1.jpg" class="profileImage">
        <div class="userInfoDescription">
            <div class="profileUserID">anByeongHeon</div>
            <div class="uploadCount">게시물 <b>3</b></div>
            <div class="profileUserName">안병헌</div>
            <button>프로필 수정</button>
        </div>
    </div>
    <div class="column" id="photo">
        <figure id="first">
            <img src="../img/userPhoto/test1.jpg">
        </figure>
    </div>
</div>
*/
/*
    <li class="application">
        <img src="../img/userPhoto/test1.jpg" class="picture">
        <div class="profileDescription">
            <div class="userName">정국</div>
            <div>2011년 11월 12일 까지</div>
            <div>첨당동 사거리 에서</div>
        </div>
        <div class="applicationAcception">
            <input type="button" value="수락">
            <input type="button" value="거절">
        </div>
    </li>
*/

const { readFileSync, readdirSync } = require("fs");
const { userInfo } = require("os");
/*
<div class="applicationListContainer">
                        <button class="tabButton" name="profile"><a href="mypage/profile">내 프로필</a></button>
                        <button class="tabButton" name="applicationList"><a href="#">사진요청 목록</a></button>
                        <button class="tabButton" name="acceptionList"><a href="#">요청 수락목록</a></button>
                    </div>
                    <div class="applicationListContainer">
                        <div class="Empty"></div>
                        <div class="profile tabList">
                        </div>
                        <ul class="applicationList tabList">
                            <li class="application">
                                <img src="../img/userPhoto/test1.jpg" class="picture">
                                <div class="profileDescription">
                                    <div class="userName">정국</div>
                                    <div>2011년 11월 12일 까지</div>
                                    <div>첨당동 사거리 에서</div>
                                </div>
                                <div class="applicationAcception">
                                    <input type="button" value="수락">
                                    <input type="button" value="거절">
                                </div>
                            </li>
                        </ul>
                        <ul class="acceptionList tabList"></ul>
                        <div class="Empty"></div>
                    </div>
*/
var template = {
    html: function (request) {
        var content = template.content(request);
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>CaptureMe</title>
                <meta charset="utf-8">
                <link rel="stylesheet" type="text/css" href="../css/default.css">
                <link rel="stylesheet" type="text/css" href="../css/mypage.css">
                <link rel="stylesheet" type="text/css" href="../css/application.css">
                <link rel="stylesheet" type="text/css" href="../css/acception.css">
                <link rel="stylesheet" type="text/css" href="../css/profile.css">
                <link rel="stylesheet" type="text/css" href="../css/imagearr.css">
            </head>
            <body>
                <header> <!-- 검색 및 네비 -->
                    <span class="CaptureMe"><a href="main">캡쳐미</a></span>
                    <span class="configure">
                        <button><a href="http://localhost:8080/mypage">마이페이지</a></button>
                        <button><a href="logoutPage">logout</a></button>
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
            </html>`
    },
    content: function (request) {
        var tpl = '';
        var option = request.params.pageId;
        if (option == 'profile') {
            tpl = template.profile(request);
        } else if (option == 'applicationList') {
            tpl = template.application(request);
        } else if (option == 'acceptionList') {
            tpl = template.acception(request);
        }
        return tpl;
    },
    profile: function (request) {
        var data=readFileSync(`userInfo/${request.session.userId}.json`,'utf8');
        var userInfo=JSON.parse(data);
        var tpl=`
        <div class="profile tabList">
            <div class="userInfo">
                <img src="${userInfo.photoInfo.profilesrc}" class="profileImage">
                <div class="userInfoDescription">
                    <div class="profileUserID">${request.session.userId}</div>
                    <div class="uploadCount">게시물 <b>${userInfo.photoInfo.photoCount}</b></div>
                    <div class="profileUserName">${userInfo.account.name}</div>
                    <button>프로필 수정</button>
                </div>
            </div>
            <div class="column" id="photo">
                <figure id="first">
                    <img src="../img/userPhoto/test1.jpg">
                </figure>
            </div>
        </div>`;
        
        return tpl;
    },
    application: function (request) {
        var tpl = `<ul class="applicationList tabList">`;
        var data = readFileSync(`userInfo/${request.session.userId}.json`, 'utf8');
        var userInfo = JSON.parse(data);
        var applicationList = userInfo.application;

        for (var i = 0; i < applicationList.length; i++) {
            var application = applicationList[i];
            tpl += `
            <li class="application">
                <img src="${application.src}" class="picture">
                <div class="profileDescription">
                    <div class="userName">${application.name}</div>
                    <div>${application.time} 까지</div>
                    <div>${application.location} 에서</div>
                </div>
                <div class="applicationAcception">
                    <button><a href=''>수락</a></button>
                    <button><a href=''>거절</a></button>
                </div>
            </li>`;
            tpl += `</ul>`;
        }

        return tpl;
    },
    acception: function (request) {
        var tpl = `<ul class="acceptionList tabList">`;
        var data = readFileSync(`userInfo/${request.session.userId}.json`, 'utf8');
        var userInfo = JSON.parse(data);
        var acceptionList = userInfo.acception;

        for (var i = 0; i < acceptionList.length; i++) {
            var acception = acceptionList[i];
            tpl += `
            <li class="application">
                <img src="${acception.src}" class="picture">
                <div class="profileDescription">
                    <div class="userName">${acception.name}</div>
                    <div>${acception.time} 까지</div>
                    <div>${acception.location} 에서</div>
                </div>
                <div class="applicationAcception">
                    <button><a href=''>완료</a></button>
                </div>
            </li>`;
            tpl += `</ul>`;
        }

        return tpl;
    }
}
module.exports = template;