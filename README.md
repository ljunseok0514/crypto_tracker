# 📈Crypto tracker(암호화폐 시세 조회 서비스)
+ 이 프로젝트는 노마드코더 React JS 강의 내용 중 한 파트를 클론코딩 후 <strong>업그레이드(api변경, webSocket적용, css수정)</strong>한 작업물입니다.



## 🗂프로젝트 소개
- **프로젝트 이름** : Crypto tracker
- **프로젝트 목적과 결과** :
  <ol>
    <li>
      <p><strong>목적: </strong>강의에서 사용한 API들이 부분 유료변경과 서비스가 종료되어 발생한 에러를 해결하기</p>
      <p><strong>결과: </strong></p>
      <p>-코인시세 정보 api를 webSocket으로 변경해 코인시세정보 조회 횟수제한<strong> → </strong>무제한 실시간으로 조회</p>
      <p>-코인 아이콘 이미지 api 변경해 파일 유실, 횟수제한<strong> → </strong>모든 아이콘 이미지 유실없이 무제한 반환받음</p>
    </li>
    <li>
      <p><strong>목적: </strong>코인시세 하락, 상승에 따라 변경되는 색상과 기호의 변화</p>
      <p><strong>결과: </strong></p>
      <p>-코인시세 상승, 하락 시 css변화 없음 <strong> → </strong>가격정보 텍스트 코인시세 상승 시 빨간색으로 변경과 ▲기호 표기, 하락 시 파란색으로 변경과 ▼기호 표기해 직관적인 UI가 생성됨</p>
      </li>
    <li>
      <p><strong>목적: </strong>코인정보를 한눈에 보기 편한 레이아웃 변경과 디바이스별 반응형 레이아웃 작업</p>
      <p><strong>결과: </strong></p>
      <p>-container width 변경 및 grid, flex를 사용하여 좁은 레이아웃과 제한적 정보 UI 노출<strong> → </strong>레이아웃이 더 넓어져 보기편하고, 한 줄에 더 많은 정보 UI를 노출 시킬 수 있음</p>
      <p>-media-query 작업으로 디바이스별 똑같은 레이아웃<strong> → </strong> PC, tablet, moblie 별로 레이아웃이 반응형으로 변경되서 사용자 친화적인 UI로 변경</p>
      </li>
  </ol>
- **프로젝트 기간** : 240227 ~ 240326
- **배포 주소** : https://crypto-tracker-eight-alpha.vercel.app/
