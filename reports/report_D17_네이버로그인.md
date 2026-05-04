# D-17 네이버 로그인 API v2 연동 보고서

## 1. 작업 개요
* **목표**: 네이버 로그인 SDK v2를 연동하고 팝업 방식과 모바일의 fallback(현재 창 리다이렉트) 처리를 구현, 콜백 페이지를 통한 인증 토큰 반환 및 Firebase Custom Token 연동 로직 작성
* **생성/수정 파일**:
  * `src/config/auth.js` (Naver Config 추가)
  * `reset-mist.html`, `restore-serum.html`, `recover-cream-balm.html` (Naver SDK 주입)
  * `src/scripts/diagnosis.js` (네이버 로그인 트리거 로직 추가)
  * `callback.html`, `src/scripts/callback.js` (콜백 처리 전용 페이지 및 스크립트 신규 생성)

## 2. 주요 구현 사항
### 2.1. 환경 설정 및 HTML 주입
* `auth.js` 내에 전달해주신 **Naver Client ID**(`U9IfAxpaOIhRW3u0wtOL`) 및 현재 도메인 기반의 Callback URL(`window.location.origin + "/callback.html"`)을 설정했습니다.
* 모든 제품 상세 페이지(`<head>` 내부)에 최신 네이버 SDK v2 스크립트를 추가했습니다.

### 2.2. 모바일/PC 분기 및 트리거 로직 (`diagnosis.js`)
* `navigator.userAgent` 정규식 검사를 통해 사용자의 환경(PC vs 모바일)을 판별하도록 하였습니다.
* `naver.LoginWithNaverId` 객체 초기화 시 `isPopup` 옵션을 동적으로 부여했습니다:
  * **PC 환경**: `isPopup: true` (팝업 윈도우 사용)
  * **모바일 환경**: `isPopup: false` (현재 창에서 이동. iOS Safari 팝업 차단 방지)
* `generateAuthorizeUrl()` 함수를 사용해 인증 페이지 진입 URL을 얻은 후, 모바일은 `location.href`, PC는 `window.open`을 호출하여 SDK 내부 버튼 대신 프로그래밍 방식(트리거)으로 동작하게 했습니다.

### 2.3. Callback 처리 로직 (`callback.html` & `callback.js`)
* **상태 파싱**: 인증 후 되돌아오는 `callback.html`에서 `naverLogin.getLoginStatus()`를 호출하여 인증 성패 및 Access Token을 추출합니다.
* **PC(팝업) 환경**: `window.opener`가 존재하는 경우 부모 창에 정의된 `window.onNaverLoginSuccess()` 콜백으로 토큰을 전달한 뒤 팝업을 스스로 닫습니다(`window.close()`).
* **모바일(현재 창) 환경**: 콜백 페이지 내에서 직접 Mock API(`/api/naver-auth`)를 호출하여 Custom Token 교환을 시도한 뒤, 로그인 성공 후 `window.location.replace('/')`를 통해 메인(혹은 이전 페이지)으로 복귀하도록 구현했습니다.

## 3. 테스트 진행 상황
* "네이버 로그인" 버튼을 눌러 각 환경에 맞는 방식으로 네이버 인증 페이지로 안전하게 진입함을 확인했습니다.
* 발급된 Access Token을 기반으로 Firebase `signInWithCustomToken` 단계로 진입하며, 백엔드 API 미연결로 인한 에러(`auth/invalid-custom-token`)가 예상대로 발생합니다. 백엔드 구성 후 즉시 연동 가능한 구조입니다.
