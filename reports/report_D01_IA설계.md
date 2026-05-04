# [GenYou Lab] D-01 IA 설계 보고서

## 1. 개요
- **작업 일차**: D-01
- **작업명**: 전환 중심 IA(Information Architecture) 및 유저 여정 설계
- **목적**: '내버려 두는 것의 미학' 철학을 반영한 최소 클릭 전환 구조를 설계하고, 사용자의 심리적 장벽을 낮추는 최적의 소셜 로그인 시점을 정의합니다.

## 2. IA (Information Architecture) 구조
브랜드 핵심 철학을 반영하여 복잡한 페이지 뎁스를 최소화하고, Single Page Application(SPA) 형태나 오버레이를 적극 활용하여 유저의 인지적 부담을 줄입니다.

### 2.1. 주요 화면 및 컴포넌트 구성
- **Home (Landing Page)**
  - Hero 섹션: 핵심 메시지 및 [피부 진단 시작하기] 메인 CTA
  - 브랜드 스토리: The Art of Leaving It Alone
  - 주요 제품: Reset Mist / Restore Serum / Recover Cream Balm
- **Diagnosis (진단 플로우 - 오버레이/모달 형태)**
  - Q1~Q3: 직관적이고 최소화된 질문으로 피부 상태 파악
  - Result: 맞춤형 루틴 및 제품 추천
  - **Auth Prompt (소셜 로그인)**: 진단 결과 저장 및 혜택 안내 (GNB 상시 노출 제거)
- **Product Detail Page (제품 상세 - 옵션)**
  - 진단 결과에서 상세 내용이 궁금한 유저를 위한 심화 페이지
  - 하단 고정(Sticky) CTA: [스마트스토어에서 구매하기]
- **Global Components**
  - Bridge Modal: 스마트스토어 외부 이동 전 0.8초 전환 안내 모달
  - Header (GNB): 로고, Home, Products, About (**로그인 버튼 미노출**)
  - Footer

## 3. 유저 여정 (User Journey) 플로우 (최대 7번 클릭)
유저가 랜딩 페이지에서 진단을 시작하여 스마트스토어에서 결제를 완료하기까지 **총 6~7번의 클릭**으로 완료되도록 설계했습니다.

```mermaid
flowchart TD
    %% 노드 정의
    Start([랜딩 페이지 접속])
    C1[Click 1: 진단 시작하기]
    C2[Click 2: 질문 1 답변]
    C3[Click 3: 질문 2 답변]
    C4[Click 4: 질문 3 답변 및 결과확인]
    Result[진단 결과 확인 및 맞춤 솔루션 제공]
    Auth{소셜 로그인 제안\n'결과를 저장하시겠습니까?'}
    C5[Click 5: 구매하러 가기]
    Bridge[Bridge 모달\n0.8초 자동 대기]
    Store[네이버 스마트스토어 외부 연결]
    C6[Click 6: 스마트스토어 구매/결제 버튼]
    End([구매 완료])

    %% 플로우 연결
    Start --> C1
    C1 --> C2
    C2 --> C3
    C3 --> C4
    C4 --> Result
    Result --> Auth
    Auth -->|로그인 또는 건너뛰기| C5
    C5 --> Bridge
    Bridge -. 0.8초 자동 이동 .-> Store
    Store --> C6
    C6 --> End

    %% 스타일링
    classDef click fill:#4a5e2f,stroke:#fff,stroke-width:2px,color:#fff;
    classDef auto fill:#f7f5ee,stroke:#c8d4b0,stroke-width:2px,color:#2e2e2e;
    
    class C1,C2,C3,C4,C5,C6 click;
    class Bridge auto;
```

## 4. 핵심 전략 및 규칙 준수 사항
1. **내버려 두는 것의 미학 (UX 반영)**
   - 유저가 고민할 선택지를 최소화한 직관적인 3-Step 진단으로 피로도를 대폭 낮췄습니다.
2. **GNB 로그인 노출 제거 및 적기 제안**
   - 접속하자마자 보이는 로그인 버튼은 유저에게 압박감을 줄 수 있습니다. GNB에서 로그인 버튼을 제거하고, 진단 결과를 확인하여 **"서비스의 가치를 체감한 시점"**에 결과를 저장하라는 맥락으로 소셜 로그인(카카오/네이버)을 자연스럽게 유도합니다.
3. **스마트스토어 이탈 방지 (Bridge Modal)**
   - 자체 결제 대신 스마트스토어로 이동할 때, 0.8초 동안 안내 모달(Bridge Modal)을 띄웁니다. 이는 급격한 화면 전환으로 인한 불안감을 해소하고 브랜드 신뢰도를 유지하기 위한 필수 장치입니다.

## 5. 자체 검증 결과
- [x] 브랜드 철학을 반영한 직관적이고 미니멀한 전환 중심 IA 설계 완료
- [x] 진단부터 스마트스토어 구매까지 6번 클릭 내외로 완료되는 여정 설계 완료
- [x] 소셜 로그인 진입 시점을 진단 결과 후로 배치 (GNB 노출 제거 원칙 준수)
- [x] Mermaid 다이어그램을 활용하여 유저 플로우 시각화 및 문서화 완료
