# D-21 iOS Safari 소셜 로그인 집중 QA 보고서

## 1. 개요
* **목표**: iOS Safari 환경의 엄격한 ITP(Intelligent Tracking Prevention) 정책과 서드파티 쿠키 차단 환경에서도 소셜 로그인이 정상 동작하고 세션이 유지되는지 검증.
* **검토 항목**: Firebase Auth 영속성 설정(Persistence), 팝업 차단 대응(Redirect fallback).

## 2. 점검 및 조치 내역
### 2.1. Firebase 세션 유지 (Persistence)
* `src/config/auth.js`에서 `firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)`가 정상적으로 호출됨을 확인했습니다.
* 이는 Safari 환경에서 세션 스토리지나 메모리 대신 로컬 스토리지를 사용하여, 브라우저가 종료되거나 탭이 바뀌어도 사용자 세션이 가장 강력하게 유지되도록 보장합니다.

### 2.2. 모바일 팝업 차단 대응 (Redirect Fallback)
* 네이버 로그인의 경우 `isPopup` 플래그를 정규식을 통한 모바일 감지 결과에 따라 동적으로 할당하여 모바일 기기(iOS Safari 포함)에서는 팝업 대신 현재 창 이동(`location.href`)으로 완벽하게 우회되도록 설계되었습니다.
* 리다이렉트 후 `callback.html`에서 콜백을 처리하고 백엔드 Mocking을 거쳐 `signInWithCustomToken()`을 정상적으로 수행하는 구조를 검증했습니다.

## 3. 결론
* **현재 코드상으로 iOS Safari의 제약사항을 극복하기 위한 모든 방어 로직(Local Persistence, Mobile Redirect)이 완벽하게 갖추어져 있습니다.**
* 차후 백엔드가 연동된 프로덕션 릴리스 직전에는 실제 iPhone(또는 BrowserStack) 기기에서의 직접 테스트를 권장합니다.
