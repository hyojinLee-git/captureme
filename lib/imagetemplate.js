
//생성해라 템플릿
module.exports={
    headertemplate:function(){
        var temp='';
        temp+=`<div class="CaptureMe"><a href="/main">캡쳐미</a></div>
        <div class="search">
            <form action="http://localhost:8080/search" method="GET"><input type="text" id='searchbar' name="search">
            <button class="icon-search" ></button>
            </form>
            
        </div>
        <div class="configure">
            <ul>
                <li><a href="photographer" class="toggle_button">I Need </a></li>
                <li><a href="http://localhost:8080/mypage" >마이페이지</a></li>
                <li><a href="http://localhost:8080/logoutPage">logout</a></li>
            </ul>
        </div>`
        return temp
    },
    maintemplate:function(userinfo){
        var temp='';
        for(var i=0; i<userinfo.length;i++){
                temp+=`<div class="container">
                <a href="/${userinfo[i].id}"><img class="thumbnail" src="${userinfo[i].representSrc}">
                <div class="overlay rectangle">
                    
                </div>
                <img class="overlay profile" src="${userinfo[i].profileSrc}
                ">
                <div class="overlay text">${userinfo[i].name}</div>
                </a>
            </div>`
        }
        return temp
    },
    //게시글개수의 배수일때 처리 필요
    numbertemplate:function(userinfo){
        var temp=`<a href='http://localhost:8080/main'><input type="button" value="1"></a>`;
        var pagenum=parseInt((userinfo)/9)+1;
        for (var i=1; i<pagenum;i++){
            temp+=`<a href="/main/${i+1}"><input type="button" value="${i+1}"></input></a>`
        }
        return temp
    },

    detailtemplate:function(image,id){
        var temp=''
        for (var i=0; i<image.length;i++){
            temp+=`<div class="mySlides fade">
            <img class="item image" src="${image[i].detailSrc}" style="height:100%">
            <div class="item description">
                
                <a href="http://localhost:8080/photoApply/${id}" class="apply"><input type="button" value="신청하기"></a>
            </div>
        </div>
        `
        }

    return temp
    },
    dottemplate:function(image){
        var temp=''
        for (var i=0; i<image.length;i++){
            temp+=`<span class="dot" onclick="currentSlide(${i+1})"></span>`
        }
        return temp
    }
}