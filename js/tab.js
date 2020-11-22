function ChangeTabContent(tabName){
	var tabs=document.getElementsByClassName("tabList");
	for(var i=0;i<tabs.length;i++){
		var className=tabs[i].className.split(" ")[0];
		if(className==tabName){
			tabs[i].style.display="flex";
		}else{
			tabs[i].style.display="none";
		}
	}
}

function tabChangeImpact(e){
	var tabs=document.getElementsByClassName("tabButton");
	for(var i=0;i<tabs.length;i++){
		//	background-color: white;  color:black;
		if(tabs[i]!=e.target){
			tabs[i].style.backgroundColor="rgba(255,255,255,0.15)";
			tabs[i].style.color="white";
		}
	}
	e.target.style.backgroundColor="white";
	e.target.style.color="black";
	ChangeTabContent(e.target.name);
}

function addEventToTab(){	
	var tabButton=document.getElementsByClassName("tabButton");
	for(var i=0;i<tabButton.length;i++){
		tabButton[i].onclick=tabChangeImpact;
	}
}

function initializeHidden(){
	var tabList=document.getElementsByClassName("tabList");
	for(var i=0;i<tabList.length;i++){
		tabList[i].style.display="none";
	}
}

function init(){
	addEventToTab();
	initializeHidden();
}

init();