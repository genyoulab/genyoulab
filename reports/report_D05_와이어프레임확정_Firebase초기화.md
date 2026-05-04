# D-05 와이어프레임 최종 확정 및 Firebase 초기화 보고서

본 문서는 GenYou Lab 프로젝트의 핵심 UI/UX인 와이어프레임 구성 요소의 확정 내역과 백엔드 인프라인 Firebase의 초기화 및 데이터베이스(Firestore) 설계 내역을 담고 있습니다.

---

## 1. 와이어프레임 최종 확정 요소 체크리스트

UI 구현의 뼈대가 되는 와이어프레임에서 `rules.md` 제약사항이 완벽하게 반영되었는지 검증 및 확정하였습니다.

* **[확정] GNB (Global Navigation Bar) 구조**
  * **좌측**: GenYou Lab 브랜드 로고
  * **중앙/우측**: [피부 진단하기] 주요 CTA 버튼 및 햄버거 메뉴(모바일)
  * **검증 사항**: `rules.md` (섹션 2-3, 3-5)에 명시된 바와 같이, GNB 영역에 **소셜 로그인 버튼을 상시 노출하지 않도록 조치**하였습니다.
* **[확정] 모바일 하단 플로팅 구매 바 (Floating Action Bar)**
  * **위치**: 모바일 환경(`max-width: 639px`)에서 뷰포트 하단(`bottom: 0`, `position: fixed`)에 상시 고정.
  * **디자인 요소**: Glassmorphism 스타일을 적용하여 배경 콘텐츠와 자연스럽게 어우러지며 시야를 가리지 않도록 설계했습니다. Z-index를 최상단(예: 990)으로 관리하여 브릿지 모달(9999)보다는 아래에 위치시킵니다.
* **[확정] 소셜 로그인 제안 UI 위치**
  * **위치**: 사용자가 '피부 진단 플로우'를 모두 마치고, 진단 결과가 화면에 렌더링된 **최종 결과 뷰 하단 영역**.
  * **설계 의도**: 사용자가 자신의 피부 타입과 루틴을 확인하여 서비스 가치(AHA)를 느낀 직후, "내 맞춤 루틴을 저장하고 혜택받기"라는 문맥과 함께 카카오/네이버 커스텀 로그인 UI를 노출하여 전환율(Conversion Rate)을 극대화합니다.

---

## 2. Firebase 프로젝트 초기화 및 Firestore 컬렉션 구조

프로젝트 환경에 Firebase SDK 설정을 구성하고, 사용자와 진단 데이터를 관리할 핵심 데이터베이스 구조(rules.md 기준)를 초기화합니다.

### 2-1. Firebase 클라이언트 초기화 구조 (구현 준비)
```javascript
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // 환경변수 기반 주입 예정 (.env)
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// D-02 요건 반영: 로컬 영속성 보장
setPersistence(auth, browserLocalPersistence);
```

### 2-2. Firestore 컬렉션 모델링 (Collection Schema)

NoSQL 데이터베이스 특성을 살려 읽기 성능을 최적화한 2개의 루트 컬렉션을 운영합니다.

1. **`users` (사용자 컬렉션)**
   * **Document ID**: Firebase Auth UID (Custom Token 기반 발급)
   * **필드 구성**:
     * `displayName` (String): 소셜 로그인에서 제공받은 이름/닉네임
     * `email` (String): 연동된 이메일 (있는 경우)
     * `provider` (String): `'kakao'` 또는 `'naver'` (소셜 연동 식별)
     * `createdAt` (Timestamp): 계정 생성일
     * `lastLoginAt` (Timestamp): 최근 접속일

2. **`diagnosis_results` (진단 결과 컬렉션)**
   * **Document ID**: Auto-generated ID
   * **필드 구성**:
     * `uid` (String): 진단을 수행한 사용자의 UID (users 컬렉션 참조)
     * `answers` (Map): 진단 시 사용자가 선택한 문항별 답변 데이터
     * `skinType` (String): 판별된 피부 타입 (예: '수분 부족형 지성')
     * `recommendedRoutine` (Array): 추천 제품 및 루틴 ID 목록
     * `createdAt` (Timestamp): 진단 수행 일시

---

## 3. Firebase Auth 소셜 프로바이더 연동 준비 완료

D-02에서 설계된 Oauth 플로우를 받쳐줄 인증 준비 작업이 마무리되었습니다.
* **Firebase 콘솔 세팅**: Authentication 탭 활성화 확인. (직접적인 Provider 설정 대신 Custom Token 방식 사용을 위해 Firebase Admin SDK 세팅 준비로 대체).
* **클라이언트 로직 연계**: 
  1. 클라이언트가 자체 발급받은 Provider Access Token을 획득.
  2. 추후 구성될 Cloud Functions 엔드포인트(`/auth/verify-token`)로 POST 요청 발송.
  3. 반환받은 Custom Token을 통해 `signInWithCustomToken(auth, token)`을 호출할 수 있는 기반 서비스 레이어 설계를 마쳤습니다.
