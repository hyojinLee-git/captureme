function apply() {
    var id = document.getElementsByClassName('input')[0];
    var password = document.getElementsByClassName('input')[1];
    var passwordCheck = document.getElementsByClassName('input')[2];
    var name = document.getElementsByClassName('input')[3];
    var phonenumber = document.getElementsByClassName('input')[4];

    if (id.value == '' || id.value.length < 5) {
        alert("id는 5자리 이상으로 설정하세요");
        id.focus();
        event.preventDefault();
    } else if (password.value == "") {
        alert("비밀번호를 입력하세요");
        password.focus();
        event.preventDefault();
    } else if(passwordCheck.value==""){
        alert("비밀번호 확인칸에 비밀번호를 다시 입력하세요");
        passwordCheck.focus();
        event.preventDefault();
    }else if(passwordCheck.value!=password.value){
        alert("비밀번호와 비밀번호 확인의 값이 다릅니다");
        passwordCheck.focus();
        event.preventDefault();
    }
     else if (name.value == "") {
        alert("이름을 입력하세요");
        name.focus();
        event.preventDefault();
    } else if (phonenumber.value == "") {
        alert("전화번호를 입력하세요");
        address.focus();
        event.preventDefault();
    } else {
        var or = confirm("가입하시겠습니까?");
        if (or == true) {

        } else {
            event.preventDefault();
        }
    }

}