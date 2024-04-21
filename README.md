# 📈Crypto tracker(암호화폐 시세 조회 서비스)

이 프로젝트는 노마드코더 React JS 강의 내용 중 한 파트를 클론코딩 후 <strong>업그레이드(api변경, WebSocket적용, css수정)</strong>한 작업물입니다.

## 🖥프로젝트 미리보기

<img style="height: 350px;" src="https://github.com/ljunseok0514/crypto_tracker/assets/73566234/f03f26ac-3f6f-4d1c-b9cc-459d59860cc9">
<img style="height: 350px;"  src="https://github.com/ljunseok0514/crypto_tracker/assets/73566234/f5e2ac0e-2cb0-463c-b2b6-19ce522680f4">
<img style="height: 350px;"  src="https://github.com/ljunseok0514/crypto_tracker/assets/73566234/b39d9552-5f10-4835-9353-f4d2f1cf5927">
<img style="height: 350px;" src="https://github.com/ljunseok0514/crypto_tracker/assets/73566234/72c03bd6-9cb2-4cbb-9463-9c8e8ea8e6af">

## 🗂프로젝트 소개

- **프로젝트 이름** : Crypto tracker
- **프로젝트 설명** :
  <ol>
    <li>
      <p>현재 거래 중인 코인 100개의 시세, 상승율, 하락율 출력
      </p>
      <p>-WebSocket 통신으로 코인정보 실시간 요청, 응답</p>
    </li>
    <li>
    <p>Recoil을 활용한 다크모드 전환기능
      </p>
      <p>-Recoil의 Atom을 활용하여 Styled-Componenets의 테마 상태를 여러 컴포넌트와 동기화함. Redux나 Context API보다 더 간결하고 직관적으로 상태를 관리 가능
      </p>
    </li>
    <li>
    <p>ReactQuery로 페이지 로드시간 단축
      </p>
      <p>-코인 상세 페이지에서 메인화면으로 복귀시, ReactQuery를 통해 서버 상태 관리를 간소화 하고 데이터 캐싱을 통해 페이지 로드 시간을 단축
      </p>
    </li>
    <li>
    <p>Styled-Componenets으로 컴포넌트 단위 스타일링
      </p>
      <p>-Styled-Componenets을 도입함으로써 CSS-in-JS의 컴포넌트별 스타일링 관리 능력과 Utility-First CSS 방식의 제한적 커스터마이징 대비, 보다 세밀한 스타일 커스터마이제이션을 통해 고유한 디자인 시스템을 구축
      </p>
    </li>
    <li>
    <p>코인정보 데이터 캔들차트, 라인차트로 시각화
      </p>
      <p>-ApexChart 사용
      </p>
    </li>
  </ol>

- **프로젝트 기간** : 240227 ~ 240410
- **배포 주소** : https://crypto-tracker-eight-alpha.vercel.app/

## 📝기술 스택

<span><img src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/recoil-3578E5?style=flat-square&logo=recoil&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/typescript-3178C6?style=flat-square&logo=typescript&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styledcomponents&logoColor=black"/></span>
<span><img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/></span>
<span><img src="https://img.shields.io/badge/html5-E34F26?style=flat-square&logo=html5&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/css3-1572B6?style=flat-square&logo=css3&logoColor=white"/></span>

## ⚙️설치 방법

```bash
git clone https://github.com/ljunseok0514/crypto_tracker.git
cd crypto_tracker
npm install
npm start
```
