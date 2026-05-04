// 2-4. 스마트스토어 연동 규칙
const SMARTSTORE_URLS = {
  'reset-mist':    'https://smartstore.naver.com/genyoulab/products/[ID]?utm_source=genyoulab&utm_medium=website&utm_campaign=reset-mist',
  'restore-serum': 'https://smartstore.naver.com/genyoulab/products/[ID]?utm_source=genyoulab&utm_medium=website&utm_campaign=restore-serum',
  'recover-balm':  'https://smartstore.naver.com/genyoulab/products/[ID]?utm_source=genyoulab&utm_medium=website&utm_campaign=recover-balm'
};

/**
 * 2-5. GA4 이벤트 추적 (필수 이벤트)
 */
function trackEvent(eventName, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  } else {
    console.log(`[GA4 Mock] Event: ${eventName}`, params);
  }
}

/**
 * 스마트스토어 이동 (브릿지 모달 포함)
 */
function goToSmartStore(productId) {
  const url = SMARTSTORE_URLS[productId];
  if (!url) return;

  trackEvent('purchase_intent', { product_id: productId });
  showBridgeModal();
  trackEvent('bridge_modal_shown', { product_id: productId });

  // 0.8초 지연 후 이동 (2-6. 브릿지 모달 표시 시간 정확히 0.8초)
  setTimeout(() => {
    hideBridgeModal();
    trackEvent('smartstore_redirect', { product_id: productId });
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, 800);
}

function showBridgeModal() {
  let modal = document.getElementById('bridge-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'bridge-modal';
    modal.className = 'glassmorphism';
    Object.assign(modal.style, {
      position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: '9999'
    });
    modal.innerHTML = `
      <div class="neumorphism radius-card" style="padding: 32px; text-align: center; max-width: 90%; width: 340px;">
        <h2 class="text-h2" style="color: var(--color-primary); margin-bottom: 12px;">GenYou Lab</h2>
        <p class="text-body" style="color: var(--color-text-secondary); margin-bottom: 24px;">안전한 구매를 위해<br/>네이버 스마트스토어로 이동합니다.</p>
        <div style="width: 100%; background: var(--color-muted); height: 4px; border-radius: 2px; overflow: hidden; position: relative;">
          <div id="bridge-progress" style="width: 0%; height: 100%; background: var(--color-primary); transition: width 0.8s ease-in-out;"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.style.display = 'flex';
  }
  requestAnimationFrame(() => {
    setTimeout(() => {
      const progress = document.getElementById('bridge-progress');
      if (progress) progress.style.width = '100%';
    }, 50);
  });
}

function hideBridgeModal() {
  const modal = document.getElementById('bridge-modal');
  if (modal) {
    modal.style.display = 'none';
    const progress = document.getElementById('bridge-progress');
    if (progress) progress.style.width = '0%';
  }
}

// 2-3. 소셜 로그인 규칙 Placeholder
function showAuthPromptAfterDiagnosis() {
  // 진단 완료 후 결과 저장 제안 시점에만 소셜 버튼 표시 (GNB 노출 금지)
}

window.goToSmartStore = goToSmartStore;
window.showAuthPromptAfterDiagnosis = showAuthPromptAfterDiagnosis;
