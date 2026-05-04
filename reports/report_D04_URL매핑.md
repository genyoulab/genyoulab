# D-04 스마트스토어 URL 매핑 및 UTM 구조 보고서

본 문서는 GenYou Lab의 제품 구매를 외부 채널(네이버 스마트스토어)로 유도할 때, 트래픽 유입 경로를 정확히 추적하고 성과를 분석하기 위한 URL 매핑 및 이벤트 추적 명세서입니다.

---

## 1. 제품별 스마트스토어 URL 매핑 테이블 (UTM 파라미터 포함)

GenYou Lab의 주요 3개 제품에 대한 외부 링크 구조입니다. 마케팅 성과 추적을 위해 UTM 파라미터(`utm_source`, `utm_medium`, `utm_campaign`)를 일관되게 적용하였습니다.

| 제품명 | 상품 식별 키 (Key) | 매핑 URL (UTM 포함) |
| :--- | :--- | :--- |
| **Reset Mist** | `reset-mist` | `https://smartstore.naver.com/genyoulab/products/[ID]?utm_source=genyoulab&utm_medium=website&utm_campaign=reset-mist` |
| **Restore Serum** | `restore-serum` | `https://smartstore.naver.com/genyoulab/products/[ID]?utm_source=genyoulab&utm_medium=website&utm_campaign=restore-serum` |
| **Recover Cream Balm** | `recover-cream-balm` | `https://smartstore.naver.com/genyoulab/products/[ID]?utm_source=genyoulab&utm_medium=website&utm_campaign=recover-cream-balm` |

> [!NOTE]
> 매핑 테이블의 `[ID]` 값은 추후 네이버 스마트스토어에 실제 상품이 등록된 후 부여받는 고유 상품번호로 교체해야 합니다.

---

## 2. GA4 전환 이벤트 목록 (rules.md 2-5 기준)

사용자가 구매 의도를 보이고 실제 쇼핑몰로 이탈하기까지의 퍼널을 분석하기 위해 설계된 GA4 이벤트 목록입니다.

* **`purchase_intent` (구매 의도 발생)**
  * **트리거**: 제품 상세 페이지(또는 메인)에서 '구매하기' 버튼을 최초로 클릭한 시점
  * **전달 파라미터**: `{ product_id: "[식별키]" }`
* **`bridge_modal_shown` (브릿지 노출 성공)**
  * **트리거**: 0.8초 브릿지 모달 화면이 정상적으로 렌더링된 시점
  * **전달 파라미터**: `{ product_id: "[식별키]" }`
* **`smartstore_redirect` (외부 전환 완료)**
  * **트리거**: 0.8초 브릿지 모달 시나리오가 종료되고, 실제 스마트스토어 URL로 리다이렉트가 발생하는 시점
  * **전달 파라미터**: `{ product_id: "[식별키]" }`

---

## 3. JavaScript URL 매핑 객체 파일

위의 로직을 프론트엔드 환경에서 쉽게 불러올 수 있도록 모듈화된 객체 형태로 작성하여 `/src/config/smartstore.js` 위치에 저장 완료하였습니다.

```javascript
// 파일 위치: /src/config/smartstore.js
export const SMARTSTORE_URLS = {
  'reset-mist': 'https://smartstore.naver.com/genyoulab/products/[ID]?utm_source=genyoulab&utm_medium=website&utm_campaign=reset-mist',
  'restore-serum': 'https://smartstore.naver.com/genyoulab/products/[ID]?utm_source=genyoulab&utm_medium=website&utm_campaign=restore-serum',
  'recover-cream-balm': 'https://smartstore.naver.com/genyoulab/products/[ID]?utm_source=genyoulab&utm_medium=website&utm_campaign=recover-cream-balm'
};
```
