// 2-4. 스마트스토어 연동 규칙
const SMARTSTORE_URLS = {
  'reset-mist':    'https://smartstore.naver.com/genyoulab?utm_source=genyoulab&utm_medium=website&utm_campaign=reset-mist',
  'restore-serum': 'https://smartstore.naver.com/genyoulab?utm_source=genyoulab&utm_medium=website&utm_campaign=restore-serum',
  'recover-balm':  'https://smartstore.naver.com/genyoulab?utm_source=genyoulab&utm_medium=website&utm_campaign=recover-balm'
};

function openSmartstore(productId) {
  const url = SMARTSTORE_URLS[productId];
  if (!url) return;

  // GA4 이벤트
  if (typeof gtag !== 'undefined') {
    gtag('event', 'purchase_intent', { product_id: productId });
  }

  // 브릿지 모달 표시
  const modal = document.getElementById('bridge-modal');
  const bar   = document.getElementById('bridge-bar');
  if (!modal || !bar) return;
  
  modal.style.display = 'flex';

  // 0.8초 프로그레스 바
  requestAnimationFrame(() => { bar.style.width = '100%'; });

  // 0.8초 후 이동
  setTimeout(() => {
    modal.style.display = 'none';
    bar.style.width = '0%';
    bar.style.transition = 'none';
    requestAnimationFrame(() => { bar.style.transition = 'width 0.8s ease-in-out'; });

    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
    if (isMobile) {
      location.href = url;        // 모바일: 현재 창
    } else {
      window.open(url, '_blank', 'noopener,noreferrer'); // PC: 새 탭
    }
  }, 800);
}

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

// 2-3. 소셜 로그인 규칙 Placeholder
function showAuthPromptAfterDiagnosis() {
  // 진단 완료 후 결과 저장 제안 시점에만 소셜 버튼 표시 (GNB 노출 금지)
}

window.openSmartstore = openSmartstore;
window.showAuthPromptAfterDiagnosis = showAuthPromptAfterDiagnosis;

function toggleDrawer() {
  const drawer = document.getElementById('gnb-drawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname;
  document.querySelectorAll('.gnb-menu a').forEach(a => {
    if (a.getAttribute('href') && path.includes(a.getAttribute('href').replace('/', ''))) {
      a.classList.add('active');
    }
  });
});


// 현재 뷰포트에 보이는 제품 감지 + 플로팅 바 제어
const productSections = [
  { id: 'reset-mist',    name: 'Reset Mist',         price: '',  productKey: 'reset-mist'    },
  { id: 'restore-serum', name: 'Restore Serum',       price: '',  productKey: 'restore-serum' },
  { id: 'recover-balm',  name: 'Recover Cream Balm',  price: '',  productKey: 'recover-balm'  }
];

let currentProduct = null;

document.addEventListener('DOMContentLoaded', () => {
  const floatingBar = document.getElementById('floating-bar');
  if (!floatingBar) return;

  // 모바일에서만 플로팅 바 활성화
  const isMobileDevice = window.innerWidth < 640;
  if (isMobileDevice) {
    floatingBar.style.display = 'flex';

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const product = productSections.find(p => p.id === entry.target.id);
          if (product) {
            currentProduct = product;
            document.getElementById('float-product-name').textContent = product.name;
            document.getElementById('float-price').textContent = product.price;
            document.getElementById('float-buy-btn').setAttribute(
              'aria-label', `네이버 스마트스토어에서 ${product.name} 구매하기`
            );
          }
        }
      });
    }, { threshold: 0.3 });

    productSections.forEach(p => {
      const el = document.getElementById(p.id);
      if (el) sectionObserver.observe(el);
    });

    // 히어로 구매 버튼이 사라지면 플로팅 바 등장
    const heroBtns = document.querySelectorAll('.buy-btn');
    const btnObserver = new IntersectionObserver((entries) => {
      const anyVisible = entries.some(e => e.isIntersecting);
      floatingBar.style.transform = anyVisible ? 'translateY(100%)' : 'translateY(0)';
    }, { threshold: 0 });

    heroBtns.forEach(btn => btnObserver.observe(btn));
  }
});

function floatBuyClick() {
  if (currentProduct) openSmartstore(currentProduct.productKey);
}
