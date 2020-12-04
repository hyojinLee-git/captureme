function login() {
    var id = document.getElementsByClassName('name')[0];
    var password = document.getElementsByClassName('name')[1];

    if (id.value == '' || id.value.length < 5) {
        alert("잘못된 ID입니다");
        id.focus();
        event.preventDefault();
    } else if (password.value == "") {
        alert("잘못된 비밀번호입니다");
        password.focus();
        event.preventDefault();
    }
}