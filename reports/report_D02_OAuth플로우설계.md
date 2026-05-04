# D-02 OAuth 플로우 설계 보고서

본 보고서는 `rules.md` 섹션 2-3 및 3-5의 규칙을 기반으로 작성된 GenYou Lab의 소셜 로그인 및 인증 시스템 설계 문서입니다.

## 1. 카카오 OAuth 2.0 플로우 설계
**플로우 요약**: `Kakao.Auth.login()` → `access_token` → Firebase Cloud Functions → `Custom Token` 발급

**상세 프로세스**:
1. 클라이언트(프론트엔드)에서 진단 완료 시점에 카카오 로그인 버튼 노출.
2. 사용자가 클릭 시 `Kakao.Auth.login()` (또는 `Kakao.Auth.authorize()`)를 호출하여 인증 진행.
3. 인증 성공 시 카카오 서버로부터 `access_token`을 발급받음.
4. 클라이언트에서 획득한 `access_token`을 Firebase Cloud Functions의 API 엔드포인트로 전송.
5. Cloud Functions 서버에서 카카오 사용자 정보 API(`https://kapi.kakao.com/v2/user/me`)를 호출하여 토큰의 유효성을 검증하고 카카오 사용자 고유 ID 획득.
6. Firebase Admin SDK를 사용해 해당 카카오 ID를 기반으로 Firebase 사용자를 생성하거나 조회 후 Custom Token(`admin.auth().createCustomToken(uid)`) 발급.
7. 생성된 Custom Token을 클라이언트로 반환.
8. 클라이언트에서 `firebase.auth().signInWithCustomToken(token)`을 호출하여 최종적으로 Firebase 세션 로그인 처리.

> **[규칙 준수 사항]**  
> 소셜 로그인 버튼은 **GNB에 상시 노출하는 것을 엄격히 금지**하며, "피부 진단 완료 후 결과 저장 제안 시점"에만 화면에 렌더링됩니다 (rules.md 섹션 2-3, 3-5).

---

## 2. 네이버 Login API v2 플로우 설계
**플로우 요약**: 팝업 방식 기본 적용 및 모바일 브라우저 환경을 위한 콜백 URL Fallback 구조 적용

**상세 프로세스**:
1. 클라이언트에서 진단 완료 시점에 네이버 로그인 버튼 노출 및 클릭 이벤트 발생.
2. **PC 환경 (기본 - 팝업 방식)**:
   * 네이버 로그인 창을 팝업으로 오픈하여 인증 진행.
   * 인증 완료 후 네이버 서버가 팝업 창을 설정된 Callback URL로 리다이렉트하며 `access_token`을 URL 해시에 포함.
   * Callback 페이지(팝업)에서 `postMessage`를 사용하여 부모 창(Opener)으로 토큰을 전달하고 팝업을 즉시 종료.
3. **모바일 환경 (Fallback - 페이지 이동 방식)**:
   * 팝업 차단 및 탭 전환 이슈를 방지하기 위해 현재 탭에서 직접 네이버 로그인 페이지로 이동.
   * 인증 완료 후 Callback URL로 되돌아올 때 토큰을 획득. 프론트엔드 라우터에서 이를 감지하여 토큰 파싱 후 서비스 이용 화면으로 복귀.
4. 프론트엔드에서 획득한 네이버 `access_token`을 카카오 플로우와 동일하게 Firebase Cloud Functions로 전송하여 사용자 검증 후 Custom Token 발급.
5. `signInWithCustomToken(token)`을 통해 Firebase 인증 최종 완료.

---

## 3. Firebase Auth setPersistence(LOCAL) 적용 계획
사용자의 로그인 상태를 브라우저 종료 후에도 안전하게 유지하기 위해 Firebase의 영속성(Persistence) 기능을 활용합니다.

**적용 방안**:
* Firebase App 초기화 후, 인증 모듈 호출 시 `firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)`을 명시적으로 설정합니다.
* 설정 완료 후 `.then()` 블록 내부에서 로그인 로직(Custom Token 로그인 등)이 실행되도록 비동기 체이닝을 구성합니다.

> **[규칙 준수 사항]**  
> 개발자가 임의로 `localStorage`, `sessionStorage`, 혹은 쿠키에 JWT 토큰이나 사용자 정보를 직접 저장하고 관리하는 행위를 **절대 금지**합니다. 세션 관리는 오직 Firebase Auth의 자체 로컬 영속성 메커니즘에 위임합니다 (rules.md 섹션 3-5).

---

## 4. 환경별 Redirect URI 분리 계획 (개발/프로덕션)
보안 강화 및 원활한 로컬 개발 테스트를 위해 소셜 로그인 제공자(카카오/네이버) 콘솔에 환경별 URI를 분리하여 등록하고 프론트엔드에서 동적으로 라우팅합니다.

**1. 로컬 개발 환경 (Development)**
* **URI**: `http://localhost:5000/auth/callback` (또는 사용 중인 로컬 포트)
* **목적**: 로컬 머신에서 프론트엔드 개발 및 Cloud Functions 에뮬레이터 연동 테스트 수행.

**2. 프로덕션 운영 환경 (Production)**
* **URI**: `https://[프로젝트-도메인].web.app/auth/callback` (예상 Firebase Hosting 도메인)
* **목적**: 실제 배포된 서버에서 사용자 인증을 처리하며, 반드시 HTTPS 환경에서만 동작.

**프론트엔드 동적 할당 로직 구현**:
```javascript
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const REDIRECT_URI = isLocalhost 
  ? 'http://localhost:5000/auth/callback' 
  : 'https://[프로젝트-도메인].web.app/auth/callback';
```
이를 통해 배포 시 별도의 환경 변수 수정 없이도 접속 도메인에 맞는 안전한 Callback URI가 카카오/네이버 SDK로 자동 전달되도록 구성합니다.
