const { count } = require('console');
var mysql=require('mysql');
var db=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'1111',
    database:'captureme'
  });
db.connect();

//생성해라 템플릿
module.exports={
    template:function(cnt,user,represent,profile){
        var temp='';
        var count=cnt[0]['COUNT(*)'];
        //console.log(count);
        for(var i=0; i<count;i++){
            temp+=`<div class="container">
                <a href="/${user[i].id}"><img class="thumbnail" src="${represent[i].representSrc}">
                <div class="overlay rectangle"></div>
                <img class="overlay profile" src="${profile[i].profileSrc}
                ">
                <div class="overlay text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non molestias quae</div></a>
            </div>`
            //console.log(temp);
        }
        return temp
    }
}