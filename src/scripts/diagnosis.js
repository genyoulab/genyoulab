import { NAVER_CLIENT_ID, NAVER_CALLBACK_URL } from '../config/auth.js';

export class DiagnosisWidget {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.step = 1;
    this.answers = {};
    if (this.container) this.render();
  }

  render() {
    if (this.step === 1) {
      this.container.innerHTML = `
        <div class="neumorphism radius-card" style="padding: 24px;">
          <h3 class="text-h3" style="margin-bottom: 16px;">1단계: 세안 직후 당김이 심한 편인가요?</h3>
          <button class="step-btn radius-btn text-body neumorphism" style="width: 100%; padding: 16px; margin-bottom: 12px; border: none; background: var(--color-surface); cursor: pointer;" onclick="window.diagnosis.answer('dry')">예, 많이 당겨요</button>
          <button class="step-btn radius-btn text-body neumorphism" style="width: 100%; padding: 16px; border: none; background: var(--color-surface); cursor: pointer;" onclick="window.diagnosis.answer('oily')">아니요, 기름져요</button>
        </div>
      `;
    } else if (this.step === 2) {
      this.container.innerHTML = `
        <div class="neumorphism radius-card" style="padding: 24px;">
          <h3 class="text-h3" style="margin-bottom: 16px;">2단계: 피부가 자주 붉어지나요?</h3>
          <button class="step-btn radius-btn text-body neumorphism" style="width: 100%; padding: 16px; margin-bottom: 12px; border: none; background: var(--color-surface); cursor: pointer;" onclick="window.diagnosis.answer('sensitive')">자주 붉어져요</button>
          <button class="step-btn radius-btn text-body neumorphism" style="width: 100%; padding: 16px; border: none; background: var(--color-surface); cursor: pointer;" onclick="window.diagnosis.answer('normal')">그렇지 않아요</button>
        </div>
      `;
    } else if (this.step === 3) {
      this.container.innerHTML = `
        <div class="neumorphism radius-card" style="padding: 24px;">
          <h3 class="text-h3" style="margin-bottom: 16px;">3단계: 주로 사용하는 화장품 제형은?</h3>
          <button class="step-btn radius-btn text-body neumorphism" style="width: 100%; padding: 16px; margin-bottom: 12px; border: none; background: var(--color-surface); cursor: pointer;" onclick="window.diagnosis.finish('watery')">가벼운 워터/젤</button>
          <button class="step-btn radius-btn text-body neumorphism" style="width: 100%; padding: 16px; border: none; background: var(--color-surface); cursor: pointer;" onclick="window.diagnosis.finish('creamy')">꾸덕한 크림</button>
        </div>
      `;
    } else if (this.step === 4) {
      this.container.innerHTML = `
        <div class="neumorphism radius-card" style="padding: 24px; text-align: center;">
          <h2 class="text-h2" style="color: var(--color-primary); margin-bottom: 8px;">당신의 피부는 수분 부족형 지성입니다.</h2>
          <p class="text-body" style="color: var(--color-text-secondary); margin-bottom: 24px;">추천 루틴: Reset Mist + Restore Serum</p>
          
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--color-muted);">
            <p class="text-body" style="margin-bottom: 16px; font-weight: 500;">결과를 저장하시겠어요?</p>
            <div style="display: flex; gap: 12px; justify-content: center;">
              <button class="btn-social btn-social-kakao text-btn-social" onclick="window.diagnosis.socialLogin('kakao')">
                카카오 로그인
              </button>
              <button class="btn-social btn-social-naver text-btn-social" onclick="window.diagnosis.socialLogin('naver')">
                네이버 로그인
              </button>
            </div>
            <div id="naverIdLogin" style="display:none;"></div>
          </div>
        </div>
      `;
    }
  }

  answer(val) {
    this.answers[`step${this.step}`] = val;
    this.step++;
    this.render();
  }

  finish(val) {
    this.answers[`step3`] = val;
    this.step++;
    this.render();
    this.saveToFirebase();
  }

  saveToFirebase() {
    console.log('[Firebase Mock] 진단 결과 임시 저장:', this.answers);
  }

  socialLogin(provider) {
    if (provider === 'kakao') {
      this.kakaoLogin();
    } else if (provider === 'naver') {
      this.naverLogin();
    } else {
      console.log(`[Firebase Auth Mock] ${provider} 소셜 로그인 대기중`);
      alert(`${provider} 로그인은 준비 중입니다.`);
    }
  }

  naverLogin() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: !isMobile, // 모바일: false (현재 창 이동), PC: true (팝업)
      loginButton: { color: "green", type: 3, height: 40 }
    });
    
    naverLogin.init();
    
    const loginUrl = naverLogin.generateAuthorizeUrl();
    if (isMobile) {
      window.location.href = loginUrl;
    } else {
      window.open(loginUrl, 'naverloginpop', 'titlebar=1, resizable=1, scrollbars=yes, width=600, height=550');
    }
  }

  kakaoLogin() {
    if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) {
      alert("카카오 SDK가 초기화되지 않았습니다.");
      return;
    }

    Kakao.Auth.login({
      success: (authObj) => {
        console.log("[Kakao Auth] 로그인 성공, Token:", authObj.access_token);
        this.fetchCustomToken(authObj.access_token, 'kakao')
          .then(customToken => firebase.auth().signInWithCustomToken(customToken))
          .then((userCredential) => {
            console.log("[Firebase Auth] Custom Token 로그인 성공:", userCredential.user);
            this.onLoginSuccess();
          })
          .catch((error) => {
            console.error("[Firebase Auth] 로그인 에러:", error);
            alert("로그인 연동 중 오류가 발생했습니다.");
          });
      },
      fail: (err) => {
        console.error("[Kakao Auth] 로그인 실패:", err);
      }
    });
  }

  // Mock function for backend call
  fetchCustomToken(accessToken, provider) {
    return new Promise((resolve) => {
      console.log(`[Backend Mock] /api/${provider}-auth 호출됨 (토큰: ${accessToken})`);
      setTimeout(() => {
        resolve(`mock_custom_token_${provider}_12345`);
      }, 500);
    });
  }

  onLoginSuccess() {
    alert("소셜 계정으로 안전하게 저장되었습니다!");
  }

  logout() {
    if (typeof Kakao !== 'undefined' && Kakao.Auth.getAccessToken()) {
      Kakao.Auth.logout(() => console.log("[Kakao Auth] 로그아웃 완료"));
    }
    // Naver logout requires removing token manually or re-prompting, just signing out of Firebase is usually enough.
    if (typeof firebase !== 'undefined') {
      firebase.auth().signOut().then(() => console.log("[Firebase Auth] 로그아웃 완료"))
        .catch((error) => console.error("[Firebase Auth] 로그아웃 에러:", error));
    }
  }
}

// 부모 창에서 인증 완료 시 호출되는 콜백 함수 (PC 팝업 용)
window.onNaverLoginSuccess = function(accessToken) {
  if (window.diagnosis) {
    window.diagnosis.fetchCustomToken(accessToken, 'naver')
      .then(customToken => firebase.auth().signInWithCustomToken(customToken))
      .then((userCredential) => {
        console.log("[Firebase Auth] Naver Custom Token 로그인 성공:", userCredential.user);
        window.diagnosis.onLoginSuccess();
      })
      .catch((error) => {
        console.error("[Firebase Auth] 네이버 로그인 에러:", error);
      });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('diagnosis-widget')) {
    window.diagnosis = new DiagnosisWidget('diagnosis-widget');
  }
});
