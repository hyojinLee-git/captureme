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

function ProfileInfo(userId,userName,photoCount,profileImage,photos){
	this.userId=userId;
	this.userName=userName;
	this.photoCount=photoCount;
	this.profileImage=profileImage;
	this.photos=photos;
}

function initializeProfile(profileInfo){
	var idDiv=createTag("div","profileUserID",profileInfo.userId);
	var countDiv=createTag("div","uploadCount","게시물 "+profileInfo.photoCount+"개");
	var userNameDiv=createTag("div","profileUserName",profileInfo.userName);
	var adjustButt=createTag("button","","프로필 수정");

	var desDiv=createTag("div","userInfoDescription","");
	desDiv.appendChild(idDiv);
	desDiv.appendChild(countDiv);
	desDiv.appendChild(userNameDiv);
	desDiv.appendChild(adjustButt);

	var profileImgTag=createTag("img","profileImage","");
	profileImgTag.src=profileInfo.profileImage;

	var userInfoDivTag=createTag("div","userInfo","");
	userInfoDivTag.appendChild(profileImgTag);
	userInfoDivTag.appendChild(desDiv);

	return userInfoDivTag;
}
function initializeProfileImages(photos){
	var newDiv=createTag("div","column","");
	newDiv.id="photo";

	for(var i=0;i<photos.length;i++){
		var newFig=imgToFigTag(photos[i],i);
		newDiv.appendChild(newFig);
	}
	return newDiv;
}
function imgToFigTag(imgSrc,index){
	newImg=createTag("img","","");
	newImg.src=imgSrc;
	isFirst= index==0;
	newFig=document.createElement("figure");
	if(isFirst){
		newFig.id="first";
	}
	newFig.appendChild(newImg);

	return newFig;
}
/*

<div class="column" id="photo">
		<figure id="first">
			<img src="../img/userPhoto/test1.jpg">
		</figure>
	</div>
*/
function init(){ //예시
	var photos=new Array();
	photos[0]="../img/userPhoto/test1.jpg";
	photos[1]="../img/userPhoto/test2.png";
	photos[2]="../img/userPhoto/test2.png";
	photos[3]="../img/userPhoto/test2.png";
	photos[4]="../img/userPhoto/test2.png";
	photos[5]="../img/userPhoto/test2.png";
	var profile=new ProfileInfo("rapa1130","안병헌",2,"../img/userPhoto/test1.jpg",photos);
	var tag= initializeProfile(profile);
	var tag2=initializeProfileImages(profile.photos);
	var profileTag=document.getElementsByClassName("profile tabList")[0];
	profileTag.appendChild(tag);
	profileTag.appendChild(tag2);

}
init();