# D-03 브릿지 UX 시나리오 및 구현 보고서

본 문서는 사용자가 구매 버튼을 클릭하여 외부 채널(네이버 스마트스토어)로 이동할 때 발생하는 경험 단절을 최소화하기 위한 '0.8초 브릿지 모달 UX'의 상세 시나리오와 구현 초안입니다.

---

## 1. 0.8초 브릿지 모달 시나리오 설계

구매 버튼 클릭 즉시 피드백을 제공하여 시스템이 동작 중임을 알리고, 사용자가 외부 사이트 이동을 자연스럽게 인지할 수 있도록 유도합니다.

* **[0ms] 이벤트 발생 및 모달 노출**
  * 배경에 부드러운 블러 효과(Glassmorphism)가 적용되며 브릿지 모달 팝업.
  * 내부 통계용 구매 의도(Purchase Intent) 로그 전송.
  * 프로그레스 바(진행 바) 게이지 애니메이션 시작 (0% → 100%).
* **[400ms] 사용자 인지 타임**
  * 애니메이션이 차오르는 동안 사용자는 화면 중앙의 안내 카피("안전한 구매를 위해...")를 읽고 상황을 인지.
* **[800ms] 모달 종료 및 화면 리다이렉트**
  * 프로그레스 바가 100%에 도달하며 시각적 로딩 종료.
  * 브릿지 모달을 화면에서 즉시 제거(display: none) 후, 분기 로직에 따라 외부 이동 처리.

---

## 2. PC 및 모바일 플랫폼 분기 로직 설계

사용자의 디바이스 환경에 맞춰 외부 링크 오픈 방식을 다르게 처리하여, 최적의 탐색 경험을 유지하고 이탈률을 방지합니다.

* **환경 감지 기준**: `navigator.userAgent`를 활용하여 모바일 OS(iPhone, iPad, iPod, Android) 여부 판별.
* **모바일 기기 (`isMobile = true`)**
  * **방식**: 현재 창 이동 (`window.location.href = targetUrl;`)
  * **설계 사유**: 모바일 환경(Safari, Chrome, 인앱 브라우저 등)에서는 새 탭(팝업)이 차단될 확률이 높으며, 모바일의 제한된 화면 내에서 탭을 전환하는 경험이 복잡성을 더하므로 현재 창에서 바로 이동시킵니다.
* **PC 환경 (`isMobile = false`)**
  * **방식**: 새 탭 이동 (`window.open(targetUrl, '_blank', 'noopener,noreferrer');`)
  * **설계 사유**: 데스크톱 환경에서는 기존 브라우징 맥락(브랜드 소개 페이지)을 남겨두는 것이 커머스 탐색의 표준 UX이므로, 새 창으로 스마트스토어를 오픈합니다.

---

## 3. 브릿지 확정 카피 (한국어)

* **시각 요소 (로고)**: `GenYou Lab` (메인 컬러 적용)
* **안내 메시지**: "안전한 구매를 위해<br/>네이버 스마트스토어로 이동합니다."

---

## 4. 브릿지 마크업 및 스타일 초안 (HTML/CSS/JS)

`rules.md`에 정의된 브랜드 컬러 시스템 및 UI 원칙(Glassmorphism, Neumorphism)을 준수한 초안 코드입니다.

### HTML/CSS 마크업 초안
```html
<!-- 브릿지 모달 컨테이너 (Glassmorphism 배경) -->
<div id="bridge-modal" class="glassmorphism" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; flex-direction: column; justify-content: center; align-items: center; z-index: 9999;">
  
  <!-- 모달 내부 카드 (Neumorphism 엠보싱) -->
  <div class="neumorphism radius-card" style="padding: 32px; text-align: center; max-width: 90%; width: 340px;">
    
    <!-- 로고 텍스트 -->
    <h2 class="text-h2" style="color: var(--color-primary); margin-bottom: 12px;">
      GenYou Lab
    </h2>
    
    <!-- 확정 카피 안내 메시지 -->
    <p class="text-body" style="color: var(--color-text-secondary); margin-bottom: 24px;">
      안전한 구매를 위해<br/>네이버 스마트스토어로 이동합니다.
    </p>
    
    <!-- 프로그레스 바 영역 -->
    <div style="width: 100%; background: var(--color-muted); height: 4px; border-radius: 2px; overflow: hidden; position: relative;">
      <!-- 실제 게이지 요소 (기본 0%, CSS transition으로 부드럽게 채워짐) -->
      <div id="bridge-progress" style="width: 0%; height: 100%; background: var(--color-primary); transition: width 0.8s ease-in-out;"></div>
    </div>
    
  </div>
</div>
```

### JS 구동 로직 초안
```javascript
function executeBridgeScenario(targetUrl) {
  const modal = document.getElementById('bridge-modal');
  const progress = document.getElementById('bridge-progress');
  
  // 1. 모달 활성화
  modal.style.display = 'flex';
  
  // 2. 애니메이션 구동 (DOM 렌더링 이후 적용)
  requestAnimationFrame(() => {
    setTimeout(() => {
      progress.style.width = '100%';
    }, 50);
  });

  // 3. 0.8초 후 이동 처리 분기
  setTimeout(() => {
    // 3-1. 모달 숨김 및 프로그레스 게이지 초기화
    modal.style.display = 'none';
    progress.style.width = '0%';
    
    // 3-2. 모바일/PC 분기 라우팅
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = targetUrl;
    } else {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  }, 800);
}
```
