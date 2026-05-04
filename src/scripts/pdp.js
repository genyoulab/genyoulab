import { SMARTSTORE_URLS } from '../config/smartstore.js';

document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('hero-buy-section');
  const floatingBar = document.getElementById('mobile-floating-bar');

  if (heroSection && floatingBar) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          floatingBar.classList.add('visible');
        } else {
          floatingBar.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });
    observer.observe(heroSection);
  }

  const ingredientLayers = document.querySelectorAll('.ingredient-layer');
  ingredientLayers.forEach(layer => {
    layer.addEventListener('click', () => {
      const details = layer.querySelector('.ingredient-details');
      const icon = layer.querySelector('.icon-body');
      if (details.style.display === 'none' || !details.style.display) {
        details.style.display = 'block';
        icon.style.transform = 'rotate(45deg)';
        icon.style.transition = 'transform 0.2s';
      } else {
        details.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
      }
    });
  });
});

window.goToSmartStore = function(productId) {
  const url = SMARTSTORE_URLS[productId];
  if (!url) return;

  if (typeof gtag === 'function') gtag('event', 'purchase_intent', { product_id: productId });

  let modal = document.getElementById('bridge-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'bridge-modal';
    modal.className = 'glassmorphism';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 9999;';
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
  
  if (typeof gtag === 'function') gtag('event', 'bridge_modal_shown', { product_id: productId });

  requestAnimationFrame(() => {
    setTimeout(() => {
      const progress = document.getElementById('bridge-progress');
      if (progress) progress.style.width = '100%';
    }, 50);
  });

  setTimeout(() => {
    modal.style.display = 'none';
    const progress = document.getElementById('bridge-progress');
    if (progress) progress.style.width = '0%';
    
    if (typeof gtag === 'function') gtag('event', 'smartstore_redirect', { product_id: productId });
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, 800);
};
