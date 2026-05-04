import { NAVER_CLIENT_ID, NAVER_CALLBACK_URL } from '../config/auth.js';

const naverLogin = new naver.LoginWithNaverId({
  clientId: NAVER_CLIENT_ID,
  callbackUrl: NAVER_CALLBACK_URL,
  isPopup: false // Callback 페이지 내에서는 상태 파싱 용도로만 쓰임
});

// 네이버 로그인 상태 초기화 및 파싱
naverLogin.init();

window.addEventListener('load', () => {
  naverLogin.getLoginStatus((status) => {
    if (status) {
      // 로그인 성공 시 access token을 얻음
      const accessToken = naverLogin.accessToken.accessToken;
      console.log("[Naver Auth] Token Callback 성공:", accessToken);
      
      // 모바일 등 부모 창이 없는 환경(현재 창 이동)과 PC 팝업 분기
      if (window.opener && window.opener !== window && window.opener.onNaverLoginSuccess) {
        // PC (팝업) 환경: 부모 창으로 토큰 전달 후 창 닫기
        window.opener.onNaverLoginSuccess(accessToken);
        window.close();
      } else {
        // 모바일 (현재 창 리다이렉트) 환경: 여기서 백엔드 호출 및 Firebase 로그인 처리 후 메인으로 리다이렉트
        fetchCustomToken(accessToken)
          .then(customToken => firebase.auth().signInWithCustomToken(customToken))
          .then((userCredential) => {
            console.log("[Firebase Auth] Naver Custom Token 로그인 성공:", userCredential.user);
            alert("소셜 계정으로 안전하게 저장되었습니다!");
            window.location.replace('/'); // 메인 또는 원래 페이지로 복귀
          })
          .catch((error) => {
            console.error("[Firebase Auth] 네이버 로그인 에러:", error);
            alert("로그인 처리 중 오류가 발생했습니다.");
            window.location.replace('/');
          });
      }
    } else {
      console.error("[Naver Auth] 상태 확인 실패");
      window.location.replace('/');
    }
  });
});

// Mock function for backend call
function fetchCustomToken(accessToken) {
  return new Promise((resolve) => {
    console.log(`[Backend Mock] /api/naver-auth 호출됨 (토큰: ${accessToken})`);
    setTimeout(() => {
      resolve(`mock_custom_token_naver_12345`);
    }, 500);
  });
}
