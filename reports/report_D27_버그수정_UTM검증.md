# D-27 Critical 버그 수정 및 UTM 최종 검증 보고서

## 1. 개요
* **목표**: 서비스 운영에 치명적인 블로커(Critical Bug)가 없는지 점검하고, 마케팅 전환 추적을 위한 UTM 파라미터가 정확히 스마트스토어 외부 링크로 매핑되는지 확인.

## 2. 검증 내역
### 2.1. Critical 버그 (현재 0건)
* **소셜 로그인 토큰 만료 에지 케이스**: Firebase Auth 영속성이 `LOCAL`로 설정되어 있어, 브라우저 종료 후 재접속 시에도 세션이 유지됩니다. 1~2시간 경과 후 토큰 만료 시, SDK에서 내부적으로 자동 Refresh 로직이 작동하며, 만약 실패하더라도 UI 상에서 자연스럽게 로그아웃 처리 후 다시 소셜 로그인 팝업/리다이렉트가 노출되는 방어 로직이 확인되었습니다.
* **무한 리다이렉트 방지**: `callback.html`에서 코드 파싱 후 즉시 `window.location.replace`를 사용하여 히스토리 스택을 지워, 뒤로 가기 시 무한 루프에 빠지는 현상을 차단했습니다.

### 2.2. UTM 파라미터 매핑 검증
* `src/config/smartstore.js` 내 객체(`SMARTSTORE_URLS`)의 URL 구조 검사 결과:
  - `utm_source=genyoulab`
  - `utm_medium=website`
  - `utm_campaign=Reset_Mist` (등 제품명)
  위 파라미터들이 모든 상품 링크에 올바르게 `?` 및 `&` 기호로 연결되어 있습니다.
* `pdp.js`의 브릿지 모달 통과 후 해당 URL로 정상적으로 리다이렉트 되는 것을 확인하여 GA4 DebugView에서 UTM 소스가 유실되지 않음을 보장합니다.

## 3. 결론
* **Critical Bug 0건 달성 완료.**
* 외부 유입 및 전환 측정을 위한 UTM 파라미터 규격화 및 전달 로직 완비.
