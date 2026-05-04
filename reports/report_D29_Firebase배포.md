# D-29 Firebase Hosting 배포 세팅 및 프로덕션 환경 보고서

## 1. 개요
* **목표**: 오프라인 로컬 환경에서 개발된 코드를 전 세계 사용자가 접속 가능한 프로덕션 서버(Firebase Hosting)로 런칭하기 위한 인프라 설정을 완료합니다.

## 2. 작업 내역
### 2.1. `firebase.json` 설정 완료
프로젝트 루트 경로에 `firebase.json` 파일을 신규 생성하여 아래와 같은 배포 최적화를 적용했습니다.
* **`public: "."`**: 현재 디렉토리 구조 그대로 배포합니다.
* **`ignore` 필터링**: 보안 및 용량 최적화를 위해 `.git`, 개발 전용 스크립트(`inject_tags.py`), 마크다운 보고서(`/reports`, `/docs`) 등 불필요한 파일이 서버에 업로드되지 않도록 제외했습니다.
* **`cleanUrls: true`**: `https://genyoulab.com/brand.html` 대신 `https://genyoulab.com/brand` 로 깔끔한 URL을 사용자에게 제공합니다. (자동 .html 확장자 제거)
* **HTTPS 강제 적용**: Firebase Hosting은 기본적으로 전역 에지 캐싱망(CDN)과 함께 인증된 무료 SSL 인증서를 자동 적용하며, 모든 HTTP 접속을 HTTPS로 강제 리다이렉트합니다.

### 2.2. 사용자 직접 수행: 라이브 배포 프로세스
모든 소스 코드 세팅은 완료되었습니다. **현재 사용 중인 터미널에서 다음 명령어들을 순서대로 실행해 주세요.**

1. **로그인**: 
   ```bash
   firebase login
   ```
2. **프로젝트 선택** (이전 D-05에서 생성한 `genyoulab-5e0e3` 선택):
   ```bash
   firebase use genyoulab-5e0e3
   ```
3. **최종 배포 실행**:
   ```bash
   firebase deploy --only hosting
   ```

### 2.3. [매우 중요] 소셜 로그인 프로덕션 도메인 변경 시나리오
배포 후 발급받은 도메인(예: `https://genyoulab-5e0e3.web.app` 혹은 커스텀 도메인 `https://genyoulab.com`)을 기준으로, 서드파티 로그인 설정을 **반드시** 변경해야 합니다.

* **네이버 로그인**: 네이버 개발자 센터 -> 내 애플리케이션 -> API 설정
  - 서비스 URL: 배포된 최종 도메인 입력
  - Callback URL: `https://[최종도메인]/callback` 입력 (cleanUrls 적용 기준)
  - `src/config/auth.js`의 `NAVER_CALLBACK_URL` 변수를 최종 도메인으로 변경 후 다시 배포.
* **카카오 로그인**: 카카오 디벨로퍼스 -> 내 애플리케이션 -> 플랫폼 -> Web
  - 사이트 도메인: 배포된 최종 도메인 추가

## 3. 결론
* 즉각 배포 가능한 형태로 소스코드의 패키징과 Hosting 라우팅 설정이 모두 완료되었습니다. 안내드린 `firebase deploy` 명령어 하나로 라이브 서버가 오픈됩니다.
