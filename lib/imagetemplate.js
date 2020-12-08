

//생성해라 템플릿
module.exports={
    template:function(cnt,user,imageSrc){
        var temp='';
        var count=cnt[0]['COUNT(*)'];
        //console.log(count);
        for(var i=0; i<count;i++){
            console.log(imageSrc[i]);
            console.log('complete');

            temp+=`<div class="container">
                <a href="/${user[i].id}"><img class="thumbnail" src="${imageSrc[i].representSrc}">
                <div class="overlay rectangle"></div>
                <img class="overlay profile" src="${imageSrc[i].profileSrc}
                ">
                <div class="overlay text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non molestias quae</div></a>
            </div>`

            //console.log(temp);
        }
        return temp
    }
}