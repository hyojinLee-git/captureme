

//생성해라 템플릿
module.exports={
    template:function(cnt,user,username,imageSrc){
        var temp='';
        var count=cnt[0]['COUNT(*)'];
        //console.log(count);
        for(var i=0; i<count;i++){
            console.log(username[i]);
            console.log('complete');

            temp+=`<div class="container">
                <a href="/${user[i].id}"><img class="thumbnail" src="${imageSrc[i].representSrc}">
                <div class="overlay rectangle"></div>
                <img class="overlay profile" src="${imageSrc[i].profileSrc}
                ">
                <div class="overlay text">${username[i].name}</div></a>
            </div>`

            //console.log(temp);
        }
        return temp
    }
}