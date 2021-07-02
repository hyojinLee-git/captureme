# captureme

## 1. Introduction

### 1. Project Introduction
사진사와 모델이 서로의 포트폴리오를 보고 컨택 할 수 있는 웹사이트입니다. 사진관이나 사진사는 그동안 찍었던 사진들을 인터넷에 올려 홍보가 가능합니다. 모델은 그동안 찍었던 작품 사진들을 등록하여 자신을 홍보할 수 있습니다. 사진가나 모델은 메인 페이지에 등록 되어 있는 포트폴리오를 보고 원하는 일시와 촬영 장소를 신청할 수 있습니다. 스냅사진, 프로필 사진, 가족사진 등을 찍고 싶을 때 포트폴리오를 살펴볼 수 있고 쇼핑몰 등에서 모델을 구인하고 싶을 때 사이트를 이용하면 좀더 편하게 모델을 섭외할 수 있는 기대효과를 갖고 있습니다.

### 2. Technologies Used
1. Frontend: HTML, CSS, Java Script
2. Backend: Nodejs & Express
3. Database: MySQL

## 2. Main & Detail

## 3. Sign up

## 4. File Upload & Modify

## 5. Apply & Accept

## 6. Conclusion

1. 프로젝트 기술스택
    -Front: html, css, vanilla js
    -Back: nodejs express
    -DB: MySQL

2. 프로젝트를 하면서 생겼던 어려운점
    -js에 대한 이해가 부족하여 인터넷에서 여러 소스코드를 복사해와야 했다.
    -시간이 부족하여 원하는 기능을 충분히 구현하지 못하였다.

3. 프로젝트를 하면서 내가 만든 기능들
    -Front:
	main페이지의 css부분(flex를 이용하여 사진 배치, hover을 이용해 프로필사진과 이름 띄우기)
	header의 css부분(fontello를 이용한 아이콘 사용)
    	detail페이지의 css부분(신청하기 버튼 컨테이너 위에 올리기)
    -Back:
	main 페이지 이미지 템플릿 생성
	detail 페이지 슬라이드 템플릿 생성
	paging기능 구현
	검색 기능 구현
	마이페이지에서 수락 클릭했을 때 신청자와 수락자 모두 요청수락목록에 나타나도록 하기
	프사와 대표사진을 삭제할때 에러처리
    -DB:
	detail 페이지 템플릿 생성할 때 join문 사용
	회원가입 할 때 insert문 사용
	프사와 대표사진 설정할때 insert혹은 update문 사용
	main에서 이미지 템플릿 생성 및 order문으로 최신순 나열 기능 구현
	페이징 기능 구현할 때 limit문 사용

4. 추가적으로 보충하고 싶은 기능
    -검색기능 에러처리
    -detail페이지에서 프로필사진을 제외한 나머지만 가지고 이미지 템플릿 만들기
    -최신순, 가나다순 등 나열 방법 설정
    -main의 이름 프사 바로밑에 띄우기
    -main에서 모델/사진사의 sns주소 아이콘으로 띄우기
    -detail페이지에서 사진에 대한 설명 올리기
    -detail페이지에서 이미지 크기에 따른 서로 다른 템플릿 생성
    -채팅방 운영
    -회원정보 수정

5. 추가적으로 공부하고 싶은 부분
    -로그인 세션 만들기
    -파일 업로드 기능 만들기
    -js 꼼꼼하게 공부하기
    -json파일에 대한 공부
