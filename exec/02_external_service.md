# 외부 서비스 정보

## Backend

1. SSAFY Blockchain Network : 가스비가 없는 특수한 블록체인 네트워크로, SSAFY에서 제공하는 블록체인 네트워크입니다.

2. IPFS Network : 파일을 분산 저장하는 네트워크로, IPFS Gateway URL을 통해 접근할 수 있습니다.

3. Pinata : IPFS에 파일을 업로드하고, 다운로드 하기 위한 게이트웨이 역할을 수행합니다.

4. Kubo : IPFS에 파일을 저장하는 Pinning 서비스로, IPFS에 파일을 저장하고, Pinning 서비스를 통해 파일을 유지합니다.

5. Elasticsearch : 검색 엔진으로, 데이터를 색인화하여 검색할 수 있습니다. 본 서비스의 경우 스마트 컨트랙트의 이벤트 로그를 구독, 색인화하여 검색합니다.

6. Redis : 분산 락으로써 블록 체인과 MySQL database의 동기화를 위해 사용합니다.

7. Docker : 상기 서비스들을 컨테이너화하여 배포합니다.

## Frontend

1. Kakao API : 카카오톡을 통해 NFT 발급된 포토 카드를 공유하는 데 사용됩니다.
