const fs = require('fs');
const path = require('path');

const htmlGnb = `<!-- ===== GNB START ===== -->
<nav id="gnb">
  <!-- 로고 -->
  <a href="/index.html" class="gnb-logo">GenYou</a>

  <!-- PC 4개 메뉴 -->
  <div class="gnb-pc-menu">

    <!-- OUR STORY -->
    <div class="gnb-drop-wrap">
      <button class="gnb-link gnb-drop-btn">OUR STORY</button>
      <div class="gnb-dropdown">
        <a href="/our-story-brand.html" class="gnb-drop-item">
          Brand Story<span class="gnb-drop-sub">젠유랩의 시작</span>
        </a>
        <a href="/our-story-3secfix.html" class="gnb-drop-item">
          3SecFix™<span class="gnb-drop-sub">성분과 원칙</span>
        </a>
        <a href="/our-story-philosophy.html" class="gnb-drop-item">
          Philosophy<span class="gnb-drop-sub">내버려 두는 것의 미학</span>
        </a>
      </div>
    </div>

    <!-- SHOP -->
    <div class="gnb-drop-wrap">
      <button class="gnb-link gnb-drop-btn">SHOP</button>
      <div class="gnb-dropdown gnb-mega-menu">
        <div class="gnb-accordion">
          <!-- 1. 3SecFix™ -->
          <div class="gnb-acc-item" tabindex="0" aria-expanded="false">
            <button class="gnb-acc-trigger" type="button">
              3SecFix™
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" class="gnb-acc-arrow">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </button>
            <div class="gnb-acc-content">
              <div class="gnb-acc-inner">
                <a href="/product.html?category=3step-3secfix" class="gnb-drop-item">
                  3SecFix™ 3Step<span class="gnb-drop-sub">3초 3단계 풀 패키지</span>
                </a>
                <a href="/product-reset-mist.html" class="gnb-drop-item">
                  리셋 베일 토너<span class="gnb-drop-sub">칙! — 유수분 밸런싱</span>
                </a>
                <a href="/product-restore-serum.html" class="gnb-drop-item">
                  리스토어 세럼<span class="gnb-drop-sub">톡! — 수분 밀도</span>
                </a>
                <a href="/product-recover-balm.html" class="gnb-drop-item">
                  리커버 크림 밤<span class="gnb-drop-sub">쓱! — 마지막 보호막</span>
                </a>
              </div>
            </div>
          </div>

          <!-- 2. 올리브 부스터 라인 -->
          <div class="gnb-acc-item" tabindex="0" aria-expanded="false">
            <button class="gnb-acc-trigger" type="button">
              올리브 부스터 라인
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" class="gnb-acc-arrow">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </button>
            <div class="gnb-acc-content">
              <div class="gnb-acc-inner">
                <a href="/product.html?category=olive-glow-booster" class="gnb-drop-item">
                  올리브 글로우 부스터<span class="gnb-drop-sub">광채 피부의 시작</span>
                </a>
              </div>
            </div>
          </div>

          <!-- 3. 썬,바디,헤어 라인 -->
          <div class="gnb-acc-item" tabindex="0" aria-expanded="false">
            <button class="gnb-acc-trigger" type="button">
              썬,바디,헤어 라인
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" class="gnb-acc-arrow">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </button>
            <div class="gnb-acc-content">
              <div class="gnb-acc-inner">
                <a href="/product.html?category=sun-care" class="gnb-drop-item">
                  썬케어<span class="gnb-drop-sub">피부 보호 선스크린</span>
                </a>
                <a href="/product.html?category=body-care" class="gnb-drop-item">
                  바디 케어<span class="gnb-drop-sub">바디 진정 및 보습</span>
                </a>
                <a href="/product.html?category=hair-care" class="gnb-drop-item">
                  헤어 케어<span class="gnb-drop-sub">두피 및 모발 영양</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EXPERIENCE -->
    <div class="gnb-drop-wrap">
      <button class="gnb-link gnb-drop-btn">EXPERIENCE</button>
      <div class="gnb-dropdown">
        <a href="/experience-review.html" class="gnb-drop-item">
          Review<span class="gnb-drop-sub">실제 후기 모음</span>
        </a>
        <a href="/experience-sns.html" class="gnb-drop-item">
          SNS<span class="gnb-drop-sub">인스타그램 · 유튜브</span>
        </a>
        <a href="/experience-event.html" class="gnb-drop-item">
          Event<span class="gnb-drop-sub">진행중인 이벤트</span>
        </a>
      </div>
    </div>

    <!-- SUPPORT -->
    <div class="gnb-drop-wrap">
      <button class="gnb-link gnb-drop-btn">SUPPORT</button>
      <div class="gnb-dropdown">
        <a href="/support-faq.html" class="gnb-drop-item">
          FAQ<span class="gnb-drop-sub">자주 묻는 질문</span>
        </a>
        <a href="/support-inquiry.html" class="gnb-drop-item">
          1:1 Inquiry<span class="gnb-drop-sub">개인 문의</span>
        </a>
        <a href="/career.html" class="gnb-drop-item">
          Join crew<span class="gnb-drop-sub">함께할 사람을 찾습니다</span>
        </a>
      </div>
    </div>

  </div><!-- /gnb-pc-menu -->

  <!-- 우측: 삼단바 버튼 하나 -->
  <button class="gnb-hamburger" onclick="openUtilMenu()" aria-label="메뉴 열기">
    <span></span><span></span><span></span>
  </button>

</nav>

<!-- ===== 유틸리티 드로어 (삼단바 클릭 시) ===== -->
<div id="util-drawer">
  <div class="util-inner">
    <div class="util-header">
      <a href="/index.html" class="gnb-logo" style="color:#4a5e2f">GenYou</a>
      <button onclick="closeUtilMenu()" class="util-close">✕</button>
    </div>

    <!-- 유틸리티 링크 (Login, Join, Cart, Mypage) -->
    <div class="util-links">
      <a href="/login.html" class="util-link">
        <span class="util-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="7" r="3.5" stroke="#2e2e2e" stroke-width="1.2"/>
            <path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="#2e2e2e" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="util-link-text">Login</span>
        <span class="util-arrow">→</span>
      </a>
      <a href="/join.html" class="util-link">
        <span class="util-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="7" r="3.5" stroke="#2e2e2e" stroke-width="1.2"/>
            <path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="#2e2e2e" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M16 4v4M14 6h4" stroke="#4a5e2f" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="util-link-text">Join Crew</span>
        <span class="util-arrow">→</span>
      </a>
      <a href="/cart.html" class="util-link">
        <span class="util-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2 3h2l2.5 9h9l2-6H6" stroke="#2e2e2e" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="9" cy="16.5" r="1.2" fill="#2e2e2e"/>
            <circle cx="14" cy="16.5" r="1.2" fill="#2e2e2e"/>
          </svg>
        </span>
        <span class="util-link-text">Cart</span>
        <span class="util-arrow">→</span>
      </a>
      <a href="/mypage.html" class="util-link">
        <span class="util-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="14" height="14" rx="3" stroke="#2e2e2e" stroke-width="1.2"/>
            <path d="M7 8h6M7 11h4" stroke="#2e2e2e" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="util-link-text">Mypage</span>
        <span class="util-arrow">→</span>
      </a>
    </div>

    <!-- 구분선 -->
    <div class="util-divider"></div>

    <!-- 모바일에서만: GNB 메뉴 -->
    <div class="util-nav-mobile">
      <div class="util-nav-section">
        <div class="util-nav-title">OUR STORY</div>
        <a href="/our-story-brand.html" onclick="closeUtilMenu()">Brand Story</a>
        <a href="/our-story-3secfix.html" onclick="closeUtilMenu()">3SecFix™</a>
        <a href="/our-story-philosophy.html" onclick="closeUtilMenu()">Philosophy</a>
      </div>
      <div class="util-nav-section">
        <div class="util-nav-title">SHOP</div>
        <div class="gnb-accordion">
          <!-- 1. 3SecFix™ -->
          <div class="gnb-acc-item" tabindex="0" aria-expanded="false">
            <button class="gnb-acc-trigger" type="button">
              3SecFix™
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" class="gnb-acc-arrow">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </button>
            <div class="gnb-acc-content">
              <div class="gnb-acc-inner">
                <a href="/product.html?category=3step-3secfix" onclick="closeUtilMenu()">3step 3SecFix™</a>
                <a href="/product-reset-mist.html" onclick="closeUtilMenu()">리셋 베일 토너</a>
                <a href="/product-restore-serum.html" onclick="closeUtilMenu()">리스토어 세럼</a>
                <a href="/product-recover-balm.html" onclick="closeUtilMenu()">리커버 크림 밤</a>
              </div>
            </div>
          </div>

          <!-- 2. 올리브 부스터 라인 -->
          <div class="gnb-acc-item" tabindex="0" aria-expanded="false">
            <button class="gnb-acc-trigger" type="button">
              올리브 부스터 라인
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" class="gnb-acc-arrow">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </button>
            <div class="gnb-acc-content">
              <div class="gnb-acc-inner">
                <a href="/product.html?category=olive-glow-booster" onclick="closeUtilMenu()">올리브 글로우 부스터</a>
              </div>
            </div>
          </div>

          <!-- 3. 썬,바디,헤어 라인 -->
          <div class="gnb-acc-item" tabindex="0" aria-expanded="false">
            <button class="gnb-acc-trigger" type="button">
              썬,바디,헤어 라인
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" class="gnb-acc-arrow">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </button>
            <div class="gnb-acc-content">
              <div class="gnb-acc-inner">
                <a href="/product.html?category=sun-care" onclick="closeUtilMenu()">썬케어</a>
                <a href="/product.html?category=body-care" onclick="closeUtilMenu()">바디 케어</a>
                <a href="/product.html?category=hair-care" onclick="closeUtilMenu()">헤어 케어</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="util-nav-section">
        <div class="util-nav-title">EXPERIENCE</div>
        <a href="/experience-review.html" onclick="closeUtilMenu()">Review</a>
        <a href="/experience-sns.html" onclick="closeUtilMenu()">SNS</a>
        <a href="/experience-event.html" onclick="closeUtilMenu()">Event</a>
      </div>
      <div class="util-nav-section">
        <div class="util-nav-title">SUPPORT</div>
        <a href="/support-faq.html" onclick="closeUtilMenu()">FAQ</a>
        <a href="/support-inquiry.html" onclick="closeUtilMenu()">1:1 Inquiry</a>
        <a href="/career.html" onclick="closeUtilMenu()">Join crew</a>
      </div>
    </div>

  </div>
</div>
<!-- ===== GNB END ===== -->`;

// Regex pattern to search for the GNB comment blocks
const gnbRegex = /<!--\s*={3,}\s*GNB START\s*={3,}\s*-->[\s\S]*?<!--\s*={3,}\s*GNB END\s*={3,}\s*-->/gi;

const files = fs.readdirSync(__dirname);
let updatedCount = 0;

files.forEach(file => {
  if (file.endsWith('.html') && fs.statSync(file).isFile()) {
    try {
      const filePath = path.join(__dirname, file);
      let content = fs.readFileSync(filePath, 'utf8');

      if (gnbRegex.test(content)) {
        // Replace matching GNB blocks
        content = content.replace(gnbRegex, htmlGnb);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated GNB in: ${file}`);
        updatedCount++;
      } else {
        console.log(`No GNB block found in: ${file}`);
      }
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
});

console.log(`\nSuccessfully updated GNB in ${updatedCount} files.`);
