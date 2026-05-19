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

# User specifically requested these exact lines
css_extra = """
.gnb-pc-menu { display: flex; }
"""

for fname in files:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if .gnb-pc-menu { display: flex; } exists in style
    if '.gnb-pc-menu { display: flex; }' not in content:
        # insert it right before the media queries
        if '/* 반응형 */' in content:
            content = content.replace('/* 반응형 */', css_extra + '\n/* 반응형 */')
        else:
            content = content.replace('</style>', css_extra + '\n</style>')
            
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {fname}")
