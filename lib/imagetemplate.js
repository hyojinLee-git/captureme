
//생성해라 템플릿
module.exports={
    maintemplate:function(userinfo){
        var temp='';
        for(var i=0; i<userinfo.length;i++){
                temp+=`<div class="container">
                <a href="/${userinfo[i].id}"><img class="thumbnail" src="${userinfo[i].representSrc}">
                <div class="overlay rectangle"></div>
                <img class="overlay profile" src="${userinfo[i].profileSrc}
                ">
                <div class="overlay text">${userinfo[i].name}</div></a>
            </div>`
        }
        return temp
    },
    numbertemplate:function(userinfo){
        var temp=`<a href='http://localhost:8080/main'><input type="button" value="1"></a>`;
        var pagenum=parseInt((userinfo)/2)+1;
        //console.log(pagenum);
        for (var i=1; i<pagenum;i++){
            temp+=`<a href="/main/${i+1}"><input type="button" value="${i+1}"></input></a>`
        }
        //var pagenum=parseInt(cnt/2)+1;
        //console.log(pagenum);
        /* for (var i=1; i<pagenum;i++){
                temp+=`<a href="/main/${i+1}"><input type="button" value="${i+1}"></input></a>`
        } */
        return temp
    },

    detailtemplate:function(image,id){
        var temp=''
        for (var i=0; i<image.length;i++){
            temp+=`<div class="mySlides fade">
            <img class="item image" src="${image[i].detailSrc}" style="height:100%">
            <div class="item description">
                <div class="text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi pariatur voluptas magni, distinctio non quos sequi illo ratione quibusdam quidem ipsum labore illum officia recusandae ducimus rerum hic ab officiis!</div>
                <a href="http://localhost:8080/photoApply/${id}" class="apply"><input type="button" value="신청하기"></a>
            </div>
        </div>`
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