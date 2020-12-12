function checkDate(){
    date=document.getElementsByTagName("input")[1].value;
    now=new Date().toISOString().substring(0, 10);
    if(date<now){
        alert(`${date}는 ${now}(현재)보다 나중이어야 합니다!`);
        event.preventDefault();
    }
}