# D-16 카카오 로그인 SDK 연동 및 Firebase Auth 구현 보고서

## 1. 작업 개요
* **목표**: 카카오 JavaScript SDK 초기화 및 로그인 팝업 연동, 발급된 Access Token을 기반으로 Firebase Custom Token 기반 로그인 처리 구현
* **수정 파일**: `reset-mist.html`, `restore-serum.html`, `recover-cream-balm.html`, `src/config/auth.js`, `src/scripts/diagnosis.js`

## 2. 주요 구현 사항
### 2.1. SDK 주입 및 환경 설정 (`auth.js`)
* 제공해주신 **Kakao APP_KEY** (`c6e9fd...`)와 **Firebase Config** 정보를 `src/config/auth.js` 파일에 통합하여 구성했습니다.
* `firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)` 옵션을 적용하여 로컬 환경에 세션이 영구적으로 보존되도록 설정했습니다.
* 각 HTML 파일의 하단에 Firebase App, Auth SDK(v8 호환) 및 Kakao SDK를 삽입했습니다.

### 2.2. 인증 흐름 구현 (`diagnosis.js`)
* **`kakaoLogin()`**:
  1. `Kakao.Auth.login` 호출: 사용자에게 카카오 계정 인증 팝업을 띄웁니다.
  2. 성공 시 발급받은 `access_token`을 서버 백엔드 API (`/api/kakao-auth`)로 전달하여 검증 및 Firebase Custom Token 생성을 요청하도록 구현했습니다.
  3. 현재 백엔드 로직이 부재한 상태이므로, 임시 Mock 로직(`fetchCustomToken`)을 통해 테스트 흐름이 진행되도록 구성했습니다.
  4. `firebase.auth().signInWithCustomToken()`을 통해 성공 시 `onLoginSuccess()`가 호출됩니다.

* **`logout()`**:
  * `Kakao.Auth.logout()`과 `firebase.auth().signOut()`을 동시 호출하여 클라이언트 세션을 안전하게 정리합니다.

## 3. 테스트 진행 결과 및 특이사항
* 로컬 환경에서 카카오 로그인 버튼 클릭 시 **정상적으로 카카오 인증 팝업**이 호출되며 인증 완료 시 Access Token을 성공적으로 받아옵니다.
* **[중요]** 현재 `signInWithCustomToken` 단계에서는 발급되는 토큰이 임시 Mock 텍스트(`mock_custom_token_12345`)이므로 Firebase에서 `auth/invalid-custom-token` 에러가 발생합니다. 향후 Firebase Cloud Functions에 실제 커스텀 토큰 발급 로직이 추가되면 이 에러는 정상적으로 해결됩니다.
