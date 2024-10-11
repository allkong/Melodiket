# 빌드 정보

## backend/melodiket

이더리움 컨트랙트와의 상호 작용을 비롯한 서비스의 핵심 로직을 담당합니다.

### 버전 정보

1. Liberica JDK 17
2. Tomcat 9.0 (내장 서버 활용)
3. Spring Boot 3
4. IDE : IntelliJ IDEA

### 환경 변수 정보

```
# .env

CURRENT_ENV={{ dev | release : 현재 환경 }}
SERVER_PORT={{ integer! : 서버 포트 }}
```

```
# .env[.dev|.release]

# 보안
JWT_SECRET={{ string! : JWT Secret Key }}
SECURITY_ALLOWED_ORIGINS={{ string! : 허용할 origin URL, ';'로 구분 }}

# DB 접속 정보
MYSQL_URL={{ string! : MySQL URL }}
MYSQL_USERNAME={{ string! : MySQL Username }}
MYSQL_PASSWORD={{ string! : MySQL Password }}

# 블록 체인 관련 정보
BLOCKCHAIN_PRIVATE_KEY={{ string! : 블록체인 지갑의 개인키 (hex) }}
BLOCKCHAIN_WALLET_ADDRESS={{ string! : 블록체인 지갑의 주소 (hex) }}
BLOCKCHAIN_RPC_URL={{ string! : 블록체인 RPC URL (https) }}
MELODIKET_CONTRACT_ADDRESS={{ string! : 공연 관리 컨트랙트 주소 (hex) }}
MELODY_TOKEN_CONTRACT_ADDRESS={{ string! : ERC20 멜로디 토큰 컨트랙트 주소 (hex) }}
TICKET_CONTRACT_ADDRESS={{ string! : NFT 티켓 관리 컨트랙트 주소 (hex) }}
PHOTO_CARD_CONTRACT_ADDRESS={{ string! : NFT 포토카드 관리 컨트랙트 주소 (hex) }}
GAS_PRICE={{ integer! : 거래 당 가스 가격 (wei) }}
GAS_LIMIT={{ integer! : 거래 당 가스 한도 }}

# AWS S3
AWS_ACCESS_KEY_ID={{ string! : AWS Access Key ID }}
AWS_SECRET_ACCESS_KEY={{ string! : AWS Secret Access Key }}
AWS_REGION={{ string! : AWS 리전 }}
AWS_BUCKET_NAME={{ string! : AWS S3 버킷 이름 }}
PRESIGNED_EXPIRE_TIME={{ integer! : 프리사인 URL 만료 시간 (초) }}
CLOUDFRONT_DOMAIN={{ string! : CloudFront 도메인 }}

# Redis
REDIS_URL={{ string! : Redis URL }}

# WebPush
VAPID_PUBLIC_KEY={{ string! : WebPush VAPID Public Key }}
VAPID_PRIVATE_KEY={{ string! : WebPush VAPID Private Key }}

# Elasticsearch
ELASTICSEARCH_HOST={{ string! : Elasticsearch 호스트 }}
ELASTICSEARCH_PORT={{ integer! : Elasticsearch 포트 }}
```

### 배포 시 특이 사항

이하 설명은 프로젝트 루트를 기준으로 합니다.

1. 로그 수집을 위한 ELK 스택을 Docker-compose up으로 실행합니다.

```bash
cd ./event-subscribe-server/elk
docker-compose up -d
```

2. 블록 체인과 MySQL database의 동기화를 위해 Redis를 사용합니다.

3. 자원 저장의 탈중앙화를 위해 티켓 및 포토 카드 이미지를 IPFS에 저장하며, Pinning 서비스인 Pinia와 kubo를 사용합니다.

---

## backend/ipfs-server

IPFS에 파일을 업로드하고, 다운로드 하기 위한 게이트웨이 역할을 수행합니다.

### 버전 정보

1. Node 20.15.1
2. Express ^4.19.2
3. pinata ^0.4.0

### 환경 변수 정보

```
PINATA_API_KEY={{ string! : Pinata API Key }}
PINATA_API_SECRET={{ string! : Pinata API Secret }}
PINATA_JWT={{ string! : Pinata JWT }}
PINATA_GATEWAY={{ string! : Pinata Gateway URL }}

IPFS_HOST={{ string! : IPFS 호스트 즈소 }}
IPFS_PORT={{ integer! : IPFS 포트 }}
```

### 배포 시 특이 사항

1. 서비스의 모든 Node 기반 소프트웨어는 pm2에 의해 관리됩니다.

2. IPFS Node는 Golang으로 작성된 클라이언트인 kubo로, Docker로 실행됩니다.

---

## frontend/melodiket

멜로디켓 서비스의 사용자 인터페이스를 담당하며, PWA로 구현되어 있습니다.

### 버전 정보

1. Node 20.15.1
2. React ^18
3. Next 14.2.9
4. TypeScript ^5

### 환경 변수 정보

```
# .env.development[.local | .release]

NEXT_PUBLIC_API_MOCKING={{ boolean! : API Mocking 여부 }}
NEXT_PUBLIC_BASE_URL={{ string! : API Base URL }}
NEXT_PUBLIC_SITE_URL={{ string! : 사이트 URL }}

NEXT_PUBLIC_IPFS_URL={{ string! : IPFS Gateway URL }}
NEXT_PUBLIC_S3_URL={{ string! : S3 URL }}
NEXT_PUBLIC_CID_URL={{ string! : CID URL }}

NEXT_PUBLIC_KAKAO_API_KEY={{ string! : 카카오 API Key }}
NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY={{ string! : WebPush VAPID Public Key }}
```

### 배포 시 특이 사항

1. 서비스의 모든 Node 기반 소프트웨어는 pm2에 의해 관리됩니다.

---

## smart-contract

이더리움 블록체인에 배포되는 스마트 컨트랙트 코드와 배포 스크립트를 담당합니다.

### 버전 정보

1. Solidity ^0.8.24 (+ OpenZeppelin ^4.5.0)
2. Hardhat ^2.22.9


### 환경 변수

```
# .env
PRIVATE_KEY={{ string! : 블록체인 지갑의 개인키 (hex without prefix '0x' ) }}

# 로컬 환경 변수
LOCALHOST_URL={{ string! : 로컬 블록체인 RPC URL (http) }}

# 세폴리아 네트워크 변수
SEPOLIA_URL={{ string! : Sepolia 블록체인 RPC URL (https) }}

# ssafy 네트워크 정보
SSAFY_URL={{ string! : SSAFY 블록체인 RPC URL (https) }}
CHAIN_ID={{ integer! : SSAFY 블록체인 Chain ID }}
```

### 배포 시 특이 사항

1. 자세한 내용은 hardhat 공식 문서를 참고해주세요.