function applicationNode(user,src,date,location){
	this.user=user;
	this.src=src;
	this.date=date;
	this.location=location;

}

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

function appendApplication(applicationNode,destiny){
	var userNameDiv=createTag("div","userName",applicationNode.user);
	var dateDiv=createTag("div","",applicationNode.date);
	var locationDiv=createTag("div","",applicationNode.location);

	var profileDiv=createTag("div","profileDescription","");
	profileDiv.appendChild(userNameDiv);
	profileDiv.appendChild(dateDiv);
	profileDiv.appendChild(locationDiv);

	var img=createTag("img","picture","");
	img.src=applicationNode.src;

	var applicationAcception=createTag("div","applicationAcception","");
	if(destiny=="applicationList"){
		var acceptionButton=createTag("input","","");
		acceptionButton.type="button";
		acceptionButton.value="수락";
		var declineButton=createTag("input","","");
		declineButton.type="button";
		declineButton.value="거절";
	
		applicationAcception.appendChild(acceptionButton);
		applicationAcception.appendChild(declineButton);
	}

	var listTag=createTag("li","application","");
	listTag.appendChild(img);
	listTag.appendChild(profileDiv);
	listTag.appendChild(applicationAcception);

	var applicationList= document.getElementsByClassName(destiny)[0];
	applicationList.append(listTag);
}

function createTag(tagName,className,innerText){
	var tag=document.createElement(tagName);
	if(className!=""){
		tag.className=className;
	}
	if(innerText!=""){
		var textNode=document.createTextNode(innerText);
		tag.appendChild(textNode);
	}
	return tag;
}

function init(){ //예시
	var first=new applicationNode("정국","../img/userPhoto/test1.jpg","2020년11월 11일","과기대 향학로");
	appendApplication(first,"applicationList");
	appendApplication(first,"applicationList");
	appendApplication(first,"applicationList");
	appendApplication(first,"applicationList");
	appendApplication(first,"applicationList");
	appendApplication(first,"applicationList");
	var first=new applicationNode("nuguenzi Molla","../img/userPhoto/test2.png","2020년11월 11일","과기대 향학로");
	appendApplication(first,"acceptionList");
	appendApplication(first,"acceptionList");
	appendApplication(first,"acceptionList");
}

init();