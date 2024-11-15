# 밴드 공연 티케팅 서비스, Melodiket 🎵

<img src="assets/melodiket.png" />

## 📅 프로젝트 정보

<div align=center>

### SSAFY 11기 2학기 특화 프로젝트

**✨ 특화 프로젝트 우수팀 (반 1등) ✨**

2024.08.19(월) ~ 2024.10.11(금) [8주]

<a href="https://www.youtube.com/watch?v=h0mi9xzEnPc">
  <img src="https://img.youtube.com/vi/h0mi9xzEnPc/3.jpg" width="250px" />
</a>

</div>
</br>

## 📖 주제

스마트 컨트랙트 기반 **밴드 공연 티케팅 서비스**

- **🎪 공연장 관리자**에게는 공연 정보/뮤지션/입장 관리를 쉽게 할 수 있도록
- 🎭 **뮤지션**에게는 정당한 수익 분배를 받을 수 있도록
- 🎫 **관객**에게는 좋아하는 뮤지션의 공연을 관람하고 응원할 수 있도록

<img src="assets/subject.png" />

</br>

## 👨‍🎤 기획 배경

- 불투명, 불공정한 수익 분배로 인한 **뮤지션의 경제적 어려움**
  - [“내 관객 없으면 정산 0원?” 홍대 클럽에 무슨 일이](https://www.kukinews.com/article/view/kuk202302020173)
- 시스템과 현행법의 허점을 노려 **암표 피해자** 발생
  - [임영웅 콘서트 암표 '500만원' 치솟더니…'초강수' 꺼냈다](https://www.hankyung.com/article/2024091248037)
- 불편한 현장 티케팅 및 입장 관리

</br>

## 📱 서비스 화면

### 💜 공연 등록

- 공연 관리자는 뮤지션들을 선택해서 공연을 등록할 수 있어요.
- 뮤지션들은 공연 요청 알림이 오면 요청을 확인하고 승인/거절해요.
- 모든 뮤지션이 승인을 완료하면 티케팅 날짜에 공연이 공개돼요.

|                                                                            |                                                                                |                                                                             |
| :------------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
| <img src="assets/demonstration/screenshots/공연 등록.jpg" width="175px" /> | <img src="assets/demonstration/recordings/gif/공연 승인1.gif" width="175px" /> | <img src="assets/demonstration/recordings/gif/내 공연.gif" width="175px" /> |
|                          (공연 관리자) 공연 등록                           |                               (뮤지션) 공연 승인                               |                            (공연 관리자) 내 공연                            |

### 💜 공연 예매

- 로그인을 하지 않아도 모두가 공연들을 확인할 수 있어요.
- 로그인 후에 원하는 공연을 예매할 수 있어요.
- 공연을 예매할 때 최애 밴드를 선택하면 선택한 밴드에게 보너스 수익이 가요.

|                                                                               |                                                                               |                                                                                     |
| :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: |
| <img src="assets/demonstration/recordings/gif/공연 목록.gif" width="175px" /> | <img src="assets/demonstration/recordings/gif/찜 리스트.gif" width="175px" /> | <img src="assets/demonstration/recordings/gif/공연 예매-좌석2.gif" width="175px" /> |
|                             (모두) 공연 조회 등록                             |                                   (관객) 찜                                   |                                  (관객) 공연 예매                                   |

### 💜 입장 처리

- 공연 관리자는 관객의 모바일 티켓(QR 코드)을 스캔하여 사용 처리할 수 있어요.
- 모든 블록체인 거래는 트랜잭션 페이지에서 투명하게 확인할 수 있어요.

|                                                                                           |                                                                                      |                                                                              |
| :---------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| <img src="assets/demonstration/recordings/gif/예매 내역-모바일 티켓.gif" width="175px" /> | <img src="assets/demonstration/recordings/gif/모바일 티켓 스캔.gif" width="175px" /> | <img src="assets/demonstration/recordings/gif/트랜잭션.gif" width="175px" /> |
|                                  (관객) 모바일 티켓 등록                                  |                             (공연 관리자) 티켓 사용 처리                             |                               (모두) 트랜잭션                                |

### 💜 포토카드

- 관람한 공연은 NFT 포토카드를 제작할 수 있어요.
- 예매할 때 선택한 최애 밴드의 싸인을 포토카드에 넣을 수 있어요.
- 제작한 포토카드는 카카오톡으로 지인들에게 공유할 수 있어요.

|                                                                                        |                                                                                   |                                                                                            |
| :------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| <img src="assets/demonstration/recordings/gif/포토카드 제작-완료.gif" width="175px" /> | <img src="assets/demonstration/recordings/gif/포토카드 공유.gif" width="175px" /> | <img src="assets/demonstration/recordings/gif/포토카드-카카오톡 공유.gif" width="175px" /> |
|                                 (모두) 공연 조회 등록                                  |                                     (관객) 찜                                     |                                      (관객) 공연 예매                                      |

</br>

## 🔮 서비스 특징

<img src="assets/feature.png" width="700px" />

### 💰 스마트 컨트랙트 기반의 수익 분배

- 공연 관리자는 공연을 등록할 때 공연장, 뮤지션, 보너스 각각의 금액을 설정해요.
- 관객은 공연을 예매할 때 최애 밴드를 선택하여 해당 밴드를 응원해요.
- 공연 이후에 공연 관리자가 정산을 요청하면 공연 관리자와 뮤지션에게 수익이 분배돼요.

<img src="assets/user-flow.png" width="700px" />

### 🎫 NFT 포토카드

- 관객이 관람한 공연을 기념할 수 있도록 NFT 포토카드를 제작해요.
- 뮤지션은 공연을 승인할 때 싸인을 해요.
- 관객은 포토카드를 제작할 때 선택한 최애 밴드의 싸인만 스티커로 사용할 수 있어요.

<img src="assets/nft-photocard.png" width="700px" />

</br>

## 🗃️ 산출물

|                  |                                                       |
| :--------------: | ----------------------------------------------------: |
|   Architecture   |     <img src="assets/architecture.jpg" width="700px"> |
| Sequence Diagram | <img src="assets/sequence-diagram.png" width="700px"> |
|       ERD        |              <img src="assets/erd.png" width="700px"> |
|    Wireframe     |        <img src="assets/wireframe.png" width="700px"> |

</br>

## 🔎 기술 스택

### 🐹 Frontend

<div>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=PWA&logoColor=white"/>
</div>
<div>
  <img src="https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logo=Zustand&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white"/>
</div>
<div>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"/>
</div>
</br>

### 🐸 Backend

<div>
  <img src="https://img.shields.io/badge/Spring Boot 3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"/>
</div>
<div>
  <img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/IPFS-65C2CB?style=for-the-badge&logo=IPFS&logoColor=white"/>
</div>
<div>
  <img src="https://img.shields.io/badge/JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
</div>
</br>

### 🧱 Blockchain

<div>
  <img src="https://img.shields.io/badge/Solidity-2C4F7C?style=for-the-badge&logo=Solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Web3j-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white"/>
</div>
</br>

### ☁ CI/CD

<div>
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"/>
</div>
<div>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white"/>
  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"/>
</div>
</br>

## 🥝 팀원

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Roles</th>
      <th>Development</th>
      <th>GitHub</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>정다빈 👑</td>
      <td>팀장,<br>Frontend</td>
      <td>
        <ul>
          <li>MSW를 활용한 API Mocking 구축</li>
          <li>모바일 티켓(QR) 생성 및 스캔 기능 구현</li>
          <li>NFT 포토카드 제작 및 카카오톡 공유 기능 구현</li>
        </ul>
      </td>
      <td align=center><a href="https://github.com/allkong">@allkong</a></td>
    </tr>
    <tr>
      <td>강혁준 🥁</td>
      <td>Frontend</td>
      <td>
        <ul>
          <li>Carousel, Menu 컴포넌트 설계</li>
          <li>Funnel UI 커스텀 훅 구현</li>
          <li>클라이언트 무한 스크롤 구현</li>
        </ul>
      </td>
      <td align=center><a href="https://github.com/kanghyukjun">@kanghyukjun</a></td>
    </tr>
    <tr>
      <td>윤병서 🎤</td>
      <td>Frontend</td>
      <td>
        <ul>
          <li>프론트엔드 API 연동</li>
          <li>마이페이지, 공연장 및 공연 관리 기능 구현</li>
          <li>공연 계약 승인, 거절 및 취소 기능 구현</li>
        </ul>
      </td>
      <td align=center><a href="https://github.com/bsyun0571">@bsyun0571</a></td>
    </tr>
    <tr>
      <td>김경호 🎹</td>
      <td>Backend</td>
      <td>
        <ul>
          <li>ELK 기반 블록체인 트랜잭션 로그 수집/관리</li>
          <li>NFT 발급 기능 등 백엔드 API 개발</li>
          <li>Jenkins 기반 CI/CD 구축 및 관리</li>
        </ul>
      </td>
      <td align=center><a href="https://github.com/kkho9654">@kkho9654</a></td>
    </tr>
    <tr>
      <td>박세빈 🎥</td>
      <td>Backend</td>
      <td>
        <ul>
          <li>3-tier 아키텍처 설계/핵심 로직 구현</li>
          <li>Authentication/Error handling 구현</li>
          <li>공연 계약 주요 비즈니스 로직 구현</li>
        </ul>
      </td>
      <td align=center><a href="https://github.com/sevin98">@sevin98</a></td>
    </tr>
    <tr>
      <td>박유빈 🎸</td>
      <td>Backend</td>
      <td>
        <ul>
          <li>솔리디티 스마트 컨트랙트 및 클라이언트 개발</li>
          <li>IPFS 노드 서버 개발</li>
          <li>Redis 분산 락 기반 트랜잭션 처리 개발</li>
        </ul>
      </td>
      <td align=center><a href="https://github.com/pcjs156">@pcjs156</a></td>
    </tr>
  </tbody>
</table>
