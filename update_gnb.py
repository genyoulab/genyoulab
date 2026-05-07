import os
import re

files = [
    'index.html',
    'brand.html',
    'career.html',
    'product.html',
    'product-reset-mist.html',
    'product-restore-serum.html',
    'product-recover-balm.html'
]

html_gnb = """<!-- ===================== GNB START ===================== -->
<nav id="gnb" style="
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(242,240,232,0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 0.5px solid #c8d4b0;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  box-sizing: border-box;
">

  <!-- 로고 -->
  <a href="/index.html" style="
    font-family: 'Pretendard', sans-serif;
    font-size: 20px;
    font-weight: 500;
    font-style: italic;
    color: #4a5e2f;
    text-decoration: none;
    flex-shrink: 0;
  ">GenYou</a>

  <!-- PC 메뉴 -->
  <div class="gnb-pc-menu" style="
    display: flex;
    align-items: center;
    gap: 4px;
  ">

    <!-- BRAND -->
    <a href="/brand.html" class="gnb-link">BRAND</a>

    <!-- PRODUCT (드롭다운) -->
    <div class="gnb-dropdown-wrap">
      <a href="/product.html" class="gnb-link gnb-has-dropdown">
        PRODUCT
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
             style="margin-left:3px; vertical-align:middle; transition:transform .2s;"
             class="gnb-arrow">
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor"
                stroke-width="1.2" stroke-linecap="round"/>
        </svg>
      </a>

      <!-- 드롭다운 패널 -->
      <div class="gnb-dropdown">
        <div style="
          font-family: 'Pretendard', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: #7a9a3f;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 10px 14px 6px;
        ">3SecFix™ 라인업</div>

        <a href="/product.html" class="gnb-dropdown-item">
          <span style="font-weight:500;">전체 제품 보기</span>
          <span class="gnb-dropdown-sub">Reset Mist · Restore Serum · Recover Balm</span>
        </a>

        <div style="height:0.5px; background:#e8e4da; margin:4px 14px;"></div>

        <a href="/product-reset-mist.html" class="gnb-dropdown-item">
          <span style="font-weight:500;">Reset Mist</span>
          <span class="gnb-dropdown-sub">칙! — 유수분 최적 밸런싱</span>
        </a>

        <a href="/product-restore-serum.html" class="gnb-dropdown-item">
          <span style="font-weight:500;">Restore Serum</span>
          <span class="gnb-dropdown-sub">톡! — 촘촘히 채워주는 수분 밀도</span>
        </a>

        <a href="/product-recover-balm.html" class="gnb-dropdown-item">
          <span style="font-weight:500;">Recover Cream Balm</span>
          <span class="gnb-dropdown-sub">쓱! — 가볍지만 쫀쫀한 마지막 보호막</span>
        </a>
      </div>
    </div>

    <!-- COMMUNITY -->
    <a href="/brand.html#community" class="gnb-link">COMMUNITY</a>

    <!-- CAREER -->
    <a href="/career.html" class="gnb-link">CAREER</a>

  </div>

  <!-- 진단하기 버튼 + 햄버거 -->
  <div style="display:flex; align-items:center; gap:12px; flex-shrink:0;">
    <button onclick="openDiagnosis()" class="gnb-cta-btn"
      aria-label="피부 진단 시작하기">
      진단하기
    </button>
    <button class="gnb-hamburger" onclick="openMobileMenu()"
      aria-label="메뉴 열기">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

</nav>

<!-- 모바일 드로어 -->
<div id="mobile-drawer" style="
  display: none;
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: #f2f0e8;
  flex-direction: column;
  padding: 24px 24px 40px;
  box-sizing: border-box;
  overflow-y: auto;
">

  <!-- 드로어 헤더 -->
  <div style="display:flex; justify-content:space-between; align-items:center;
              margin-bottom:40px;">
    <a href="/index.html" style="
      font-family: 'Pretendard', sans-serif;
      font-size: 20px; font-weight: 500;
      font-style: italic; color: #4a5e2f;
      text-decoration: none;">GenYou</a>
    <button onclick="closeMobileMenu()" style="
      background: none; border: none; cursor: pointer;
      font-size: 24px; color: #6b6b6b; line-height: 1;
      padding: 4px;">✕</button>
  </div>

  <!-- 드로어 메뉴 목록 -->
  <div style="display:flex; flex-direction:column; gap:0;">

    <a href="/brand.html" onclick="closeMobileMenu()"
       class="drawer-link">BRAND</a>

    <!-- PRODUCT 탭 (클릭으로 하위 펼침) -->
    <div>
      <button onclick="toggleProductMenu()" class="drawer-link drawer-toggle"
        id="product-toggle">
        PRODUCT
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
             id="product-arrow" style="transition:transform .25s;">
          <path d="M3 5L7 9L11 5" stroke="#2e2e2e"
                stroke-width="1.2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- PRODUCT 하위 메뉴 -->
      <div id="product-submenu" style="
        display: none;
        flex-direction: column;
        background: #EAF3DE;
        border-radius: 12px;
        margin: 4px 0 8px;
        overflow: hidden;
      ">
        <a href="/product.html" onclick="closeMobileMenu()"
           class="drawer-sub-link">
          <span style="font-weight:500;">전체 제품 보기</span>
          <span style="font-size:11px; color:#6b6b6b; display:block; margin-top:1px;">
            3SecFix™ 라인업
          </span>
        </a>
        <div style="height:0.5px; background:#c8d4b0; margin:0 16px;"></div>
        <a href="/product-reset-mist.html" onclick="closeMobileMenu()"
           class="drawer-sub-link">
          <span style="font-weight:500;">Reset Mist</span>
          <span style="font-size:11px; color:#6b6b6b; display:block; margin-top:1px;">
            칙! — 유수분 최적 밸런싱
          </span>
        </a>
        <a href="/product-restore-serum.html" onclick="closeMobileMenu()"
           class="drawer-sub-link">
          <span style="font-weight:500;">Restore Serum</span>
          <span style="font-size:11px; color:#6b6b6b; display:block; margin-top:1px;">
            톡! — 촘촘히 채워주는 수분 밀도
          </span>
        </a>
        <a href="/product-recover-balm.html" onclick="closeMobileMenu()"
           class="drawer-sub-link">
          <span style="font-weight:500;">Recover Cream Balm</span>
          <span style="font-size:11px; color:#6b6b6b; display:block; margin-top:1px;">
            쓱! — 가볍지만 쫀쫀한 마지막 보호막
          </span>
        </a>
      </div>
    </div>

    <a href="/brand.html#community" onclick="closeMobileMenu()"
       class="drawer-link">COMMUNITY</a>

    <a href="/career.html" onclick="closeMobileMenu()"
       class="drawer-link">CAREER</a>

  </div>

  <!-- 드로어 하단 진단하기 버튼 -->
  <div style="margin-top:auto; padding-top:40px;">
    <button onclick="openDiagnosis(); closeMobileMenu();" style="
      width: 100%; height: 56px;
      background: #4a5e2f; color: #fff; border: none;
      border-radius: 16px; cursor: pointer;
      font-family: 'Pretendard', sans-serif;
      font-size: 16px; font-weight: 500;
    ">진단하기 시작하기</button>
  </div>

</div>
<!-- ===================== GNB END ===================== -->"""

css = r"""
<style>
/* Pretendard 폰트 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

/* GNB 공통 링크 */
.gnb-link {
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #2e2e2e;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 8px;
  letter-spacing: 0.04em;
  transition: color 0.15s, background 0.15s;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.gnb-link:hover { color: #4a5e2f; background: rgba(74,94,47,0.06); }
.gnb-link.active { color: #4a5e2f; font-weight: 500; }

/* 드롭다운 래퍼 */
.gnb-dropdown-wrap {
  position: relative;
}

/* 드롭다운 화살표 회전 */
.gnb-dropdown-wrap:hover .gnb-arrow {
  transform: rotate(180deg);
}

/* 드롭다운 패널 */
.gnb-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(242,240,232,0.98);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 0.5px solid #c8d4b0;
  border-radius: 16px;
  min-width: 240px;
  padding: 6px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06);
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(-6px);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  z-index: 100;
}

/* 드롭다운 호버 시 표시 */
.gnb-dropdown-wrap:hover .gnb-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* 드롭다운 항목 */
.gnb-dropdown-item {
  display: flex;
  flex-direction: column;
  padding: 10px 14px;
  border-radius: 10px;
  text-decoration: none;
  color: #2e2e2e;
  font-family: 'Pretendard', sans-serif;
  font-size: 13px;
  transition: background 0.15s;
}
.gnb-dropdown-item:hover { background: #EAF3DE; color: #27500A; }

/* 드롭다운 서브텍스트 */
.gnb-dropdown-sub {
  font-size: 11px;
  color: #6b6b6b;
  margin-top: 2px;
  font-weight: 400;
}
.gnb-dropdown-item:hover .gnb-dropdown-sub { color: #4a5e2f; }

/* 진단하기 버튼 */
.gnb-cta-btn {
  font-family: 'Pretendard', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  background: #4a5e2f;
  border: none;
  border-radius: 24px;
  padding: 8px 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, transform 0.1s;
}
.gnb-cta-btn:hover { background: #3b4f24; }
.gnb-cta-btn:active { transform: scale(0.97); }

/* 햄버거 버튼 */
.gnb-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.gnb-hamburger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: #2e2e2e;
  border-radius: 1px;
  transition: all 0.2s;
}

/* 드로어 링크 */
.drawer-link {
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #2e2e2e;
  text-decoration: none;
  padding: 14px 0;
  border-bottom: 0.5px solid #e8e4da;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: color 0.15s;
}
.drawer-link:hover { color: #4a5e2f; }
.drawer-toggle { border-bottom: 0.5px solid #e8e4da; }

/* 드로어 하위 링크 */
.drawer-sub-link {
  font-family: 'Pretendard', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #2e2e2e;
  text-decoration: none;
  padding: 14px 16px;
  display: block;
  transition: background 0.15s;
}
.drawer-sub-link:hover { background: rgba(74,94,47,0.08); }

/* 현재 페이지 active 표시 */
.gnb-link.current-page { color: #4a5e2f; font-weight: 500; }
.gnb-dropdown-item.current-page { background: #EAF3DE; color: #27500A; }

/* 반응형 */
@media (max-width: 639px) {
  #gnb { padding: 0 20px; }
  .gnb-pc-menu { display: none !important; }
  .gnb-hamburger { display: flex; }
  .gnb-cta-btn { display: none; }
}
@media (min-width: 640px) {
  .gnb-hamburger { display: none; }
  #mobile-drawer { display: none !important; }
}
@media (min-width: 640px) and (max-width: 1023px) {
  #gnb { padding: 0 32px; }
  .gnb-link { font-size: 13px; padding: 8px 10px; }
  .gnb-cta-btn { padding: 8px 14px; font-size: 12px; }
}
</style>
"""

js = r"""
/* ── 모바일 드로어 ── */
function openMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  drawer.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  drawer.style.display = 'none';
  document.body.style.overflow = '';
}

/* ── PRODUCT 하위 메뉴 토글 ── */
function toggleProductMenu() {
  const sub    = document.getElementById('product-submenu');
  const arrow  = document.getElementById('product-arrow');
  const isOpen = sub.style.display === 'flex';
  sub.style.display   = isOpen ? 'none' : 'flex';
  sub.style.flexDirection = 'column';
  arrow.style.transform   = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}

/* ── 현재 페이지 active 표시 ── */
(function markActivePage() {
  const path = location.pathname;

  /* PC 메뉴 */
  document.querySelectorAll('.gnb-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && path.endsWith(href.replace(/^\//, ''))) {
      a.classList.add('current-page');
    }
  });

  /* 드롭다운 항목 */
  document.querySelectorAll('.gnb-dropdown-item').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && path.endsWith(href.replace(/^\//, ''))) {
      a.classList.add('current-page');
    }
  });

  /* PRODUCT 메뉴 — 제품 상세 페이지에 있을 때 PRODUCT 메뉴 강조 */
  if (path.includes('product')) {
    document.querySelectorAll('.gnb-has-dropdown').forEach(el => {
      el.classList.add('current-page');
    });
  }
})();

/* ── ESC 키로 드로어 닫기 ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileMenu();
});
"""

for fname in files:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find nav
    nav_start = content.find('<nav>')
    if nav_start == -1:
        nav_start = content.find('<nav id="gnb"')
        
    if nav_start != -1:
        nav_end = content.find('</nav>', nav_start) + 6
        
        # Find gnb-drawer
        drawer_start = content.find('<div id="gnb-drawer"', nav_end)
        if drawer_start != -1 and drawer_start - nav_end < 100:
            main_start = content.find('<main>', drawer_start)
            if main_start != -1:
                content = content[:nav_start] + html_gnb + '\n\n  ' + content[main_start:]
        else:
            # Handle if there's no main but there is a drawer
            drawer_end = content.find('</div>\n', drawer_start) + 7
            content = content[:nav_start] + html_gnb + '\n' + content[drawer_end:]
            
    # CSS
    if css not in content:
        content = content.replace('</head>', css + '\n</head>')
        
    # JS
    script_blocks = list(re.finditer(r'<script[^>]*>(.*?)</script>', content, re.DOTALL))
    if script_blocks:
        last_script = script_blocks[-1]
        old_script_content = last_script.group(1)
        if 'openMobileMenu()' not in old_script_content:
            new_script_content = old_script_content + '\n' + js
            content = content[:last_script.start(1)] + new_script_content + content[last_script.end(1):]
    else:
        content = content.replace('</body>', '<script>\n' + js + '\n</script>\n</body>')
        
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated {fname}')
