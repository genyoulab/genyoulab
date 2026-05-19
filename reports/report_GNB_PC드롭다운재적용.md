# GNB PC 드롭다운 재적용 보고서

## 1. 작업 개요
* **목표**: 사이트 내 모든 GNB 영역(총 7개 파일)에 누락되었던 `.gnb-pc-menu { display: flex; }` 스타일을 포함하여 GNB 전체 교체 코드를 정상적으로 재적용하고, Firebase에 최종 재배포합니다.

## 2. 수정된 파일 목록 및 확인 결과
다음 7개 파일 모두에 대해 GNB 코드 재교체 및 체크리스트 검증을 진행했습니다.

1. **`index.html`**
2. **`brand.html`**
3. **`career.html`**
4. **`product.html`**
5. **`product-reset-mist.html`**
6. **`product-restore-serum.html`**
7. **`product-recover-balm.html`**

### ✅ 각 파일 확인 결과 (Checklist)
수정된 7개의 파일에서 아래 4가지 핵심 요소가 모두 정상적으로 존재하는 것을 스크립트 및 명령어로 교차 검증하였습니다.
- [x] `<nav>` 태그 안에 `class="gnb-pc-menu"` 가 존재함.
- [x] `class="gnb-dropdown-wrap"` 요소가 존재함.
- [x] `class="gnb-dropdown"` 요소가 존재함.
- [x] `<style>` 태그 영역 내에 필수 CSS인 `.gnb-pc-menu { display: flex; }` 및 `@media (max-width: 639px) { .gnb-pc-menu { display: none !important; } }` 코드가 삽입되어 있음.

## 3. Firebase 재배포 완료 여부
* 변경된 내용을 바탕으로 Firebase Hosting 배포(`npx firebase-tools deploy --only hosting`)를 실행했습니다.
* **배포 상태**: 성공적으로 배포 완료
* **Hosting URL**: https://genyoulab-5e0e3.web.app
