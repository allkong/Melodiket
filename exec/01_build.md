## 서버 목록

1. nginx 웹서버
2. 맬로디켓 메인 서버
3. ipfs서버
4. melodiket-client
5. eventCollector서버
6. ELK
7. jenkins

## 데이터베이스 정보

- 3306 포트
- mysql
- id: kyungho
- pw : kkho9654kkho9654

## 1. nginx.conf

```
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 768;
        # multi_accept on;
}

http {
        client_max_body_size 10M;


        server {
                server_name j11a310.p.ssafy.io;

                location / {
                        proxy_pass http://localhost:3000/;
                        proxy_set_header Host $host;
                        proxy_set_header X-Real-IP $remote_addr;
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                        proxy_set_header X-Forwarded-Proto $scheme;
                }

                location /kubo/ {
                        proxy_pass http://localhost:4000/;
                        proxy_set_header Host $host;
                        proxy_set_header X-Real-IP $remote_addr;
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                        proxy_set_header X-Forwarded-Proto $scheme;
                        proxy_connect_timeout 600s;
                        proxy_send_timeout 600s;
                        proxy_read_timeout 600s;
                        send_timeout 600s;
                }

                location /bank/ {
                        proxy_pass http://localhost:9091/;
                        proxy_set_header Host $host;
                        proxy_set_header X-Real-IP $remote_addr;
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                        proxy_set_header X-Forwarded-Proto $scheme;
                }

                location /melodiket/ {
                        proxy_pass http://localhost:8077/;
                        proxy_set_header Host $host;
                        proxy_set_header X-Real-IP $remote_addr;
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                        proxy_set_header X-Forwarded-Proto $scheme;
                        proxy_connect_timeout 600s;
                        proxy_send_timeout 600s;
                        proxy_read_timeout 600s;
                        send_timeout 600s;
                }


    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/j11a310.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/j11a310.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;
        # server_tokens off;

        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        gzip on;

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;


        server {
    if ($host = j11a310.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


                listen 80;
                server_name j11a310.p.ssafy.io;
    return 404; # managed by Certbot


}}

```

## 2. 멜로디켓 api 백엔드 서버

- 경로 : `/S11P21A310/backend/melodiket`
  > **메인 로직이 담겨있는 멜로디켓 API 백엔드 서버입니다.**
- 버전

  - 자바 17, spring boot 3.3.3

- 빌드 스크립트

```
#!/bin/bash
set -x  # 이 부분을 추가하여 모든 명령이 출력되도록 설정

mkdir -p ~/logs/melodiket
LOG_FILE=~/logs/melodiket/$(date +"%Y-%m-%d_%H:%M:%S").log

cd /home/ubuntu/applications/S11P21A310/backend/melodiket
./gradlew build --init-script ./init.gradle

sudo fuser -k 8077/tcp

echo "Starting the application..." &>> "$LOG_FILE"
java -jar /home/ubuntu/applications/S11P21A310/backend/melodiket/build/libs/melodiket-0.0.1-SNAPSHOT.jar --spring.profiles.active=release &>> "$LOG_FILE" &

if [ $? -ne 0 ]; then
    echo "Application failed to start. Check logs for more details." &>> "$LOG_FILE"
else
    echo "Application started successfully." &>> "$LOG_FILE"
fi

# tail -f "$LOG_FILE"

```

- env파일
- .env

```
CURRENT_ENV=release
SERVER_PORT=8077
```

- release.env

```
# 은행 서버 URL
BANK_SERVER_URL=http://localhost:9091

# JWT 및 API
JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpEQkMiLCJpYXQiOjE1MTYyMzkwMjJ9AgifC8bF6g8pwPWa9WNwflL5BI0QM8Sf3fJcsCXVNs

# 허용할 origins
SECURITY_ALLOWED_ORIGINS=http://localhost:3000;http://localhost:8080;https://j11a310.p.ssafy.io

# mysql
MYSQL_URL=jdbc:mysql://localhost:3306/melodiket?&serverTimezone=Asia/Seoul
MYSQL_USERNAME=root
MYSQL_PASSWORD=cBQo5BT3rlJRycBQo5BT3rlJRycBQo5BT3rlJRycBQo5BT3rlJRy

BLOCKCHAIN_PRIVATE_KEY=0x8633fbe69f16ba0c96d7a0d4a274dad4f45fb3922c5fdaba25e4858c56a35a5f
BLOCKCHAIN_WALLET_ADDRESS=0x6009560432b36eFC5E0F649B62a7783e4ecD0B03
BLOCKCHAIN_RPC_URL=http://rpc.ssafy-blockchain.com/

MELODIKET_CONTRACT_ADDRESS=0x114d86FD1131DBD22044CFC9c97BAF310BF7DF08
MELODY_TOKEN_CONTRACT_ADDRESS=0x2Eda33b0E660ECDb6dfCCdA9c4b32c1459B2e6C7
TICKET_CONTRACT_ADDRESS=0x7a0F325F0D9eCFf77E765FD564Ef7ee897472b67
PHOTO_CARD_CONTRACT_ADDRESS=0xAF929c8D409DF718d62781ac119E3a02297A6154

GAS_PRICE=0
GAS_LIMIT=30000000

AWS_ACCESS_KEY_ID=AKIAYHJANNAZ5OZPDY53
AWS_SECRET_ACCESS_KEY=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
AWS_REGION=ap-southeast-2
AWS_BUCKET_NAME=melodiket
PRESIGNED_EXPIRE_TIME=600000
CLOUDFRONT_DOMAIN=d2zj12sxzh0609.cloudfront.net
REDIS_URL=redis://localhost:6379

VAPID_PUBLIC_KEY=BNmnFRxa9FdZkUMPuPFNltSjONaXdIvMrDDjC3EBCQuNdm61XNfpfrBbDCN-_ZW-oLAAJA2Xpe83ITiZJFv5qBo
VAPID_PRIVATE_KEY=nSW1WteVY6-bU0ZIUyAXCc-_71mmpD47kY_tHRv3gRA

ELASTICSEARCH_HOST=j11a310.p.ssafy.io
```

## 3. ipfs서버

- 경로 : `/S11P21A310/backend/ipfs-server`

  > **ipfs이미지 캐싱을 위한 ipfs서버**

- 빌드 스크립트

```
#!/bin/bash
export NVM_DIR="$HOME/.nvm"
source $NVM_DIR/nvm.sh
cd /home/ubuntu/applications/S11P21A310/backend/ipfs-server

# 로그 파일 경로 설정
LOG_FILE="$HOME/logs/pm2_deploy/ipfs/$(date +"%Y-%m-%d_%H-%M-%S").log"
mkdir -p $(dirname "$LOG_FILE")

# 백그라운드 실행 및 로그 파일에 출력
/home/ubuntu/.nvm/versions/node/v20.15.0/bin/npm i &>> "$LOG_FILE" &
wait # 'npm install'이 완료될 때까지 대기

/home/ubuntu/.nvm/versions/node/v20.15.0/bin/pm2 restart ipfs-server &>> "$LOG_FILE" &
wait # 'pm2 restart'가 완료될 때까지 대기

echo "IPFS server deployment completed." &>> "$LOG_FILE"

```

## 4. melodiket-client

- 경로 : `/S11P21A310/frontend/melodiket`

  > nextjs기반 ssr을 위한 배포

- 빌드 스크립트

```
#!/bin/bash
export NVM_DIR="$HOME/.nvm"
source $NVM_DIR/nvm.sh
cd /home/ubuntu/applications/S11P21A310/frontend/melodiket

# 백그라운드로 실행할 때 출력을 로그 파일에 기록하고자 함
LOG_FILE="$HOME/logs/pm2_deploy/fe/$(date +"%Y-%m-%d_%H-%M-%S").log"
mkdir -p $(dirname "$LOG_FILE")

# 백그라운드 실행 및 로그 파일에 출력
/home/ubuntu/.nvm/versions/node/v20.15.0/bin/yarn install &>> "$LOG_FILE" &
wait # 'yarn install'이 완료될 때까지 대기

/home/ubuntu/.nvm/versions/node/v20.15.0/bin/yarn build &>> "$LOG_FILE" &
wait # 'yarn build'가 완료될 때까지 대기

/home/ubuntu/.nvm/versions/node/v20.15.0/bin/pm2 restart melodiket-client &>> "$LOG_FILE" &
wait # 'pm2 restart'가 완료될 때까지 대기

echo "Frontend deployment completed." &>> "$LOG_FILE"

```

- 환경변수
  - .env

```
NEXT_PUBLIC_API_MOCKING=disabled
NEXT_PUBLIC_BASE_URL=https://j11a310.p.ssafy.io/melodiket/api/v1
NEXT_PUBLIC_SITE_URL=https://j11a310.p.ssafy.io

NEXT_PUBLIC_S3_URL='https:/'
NEXT_PUBLIC_IPFS_URL='https://j11a310.p.ssafy.io/kubo/ipfs'

NEXT_PUBLIC_KAKAO_API_KEY=083407cc8986f898c83f457cee580c3a
NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY=BNmnFRxa9FdZkUMPuPFNltSjONaXdIvMrDDjC3EBCQuNdm61XNfpfrBbDCN-_ZW-oLAAJA2Xpe83ITiZJFv5qBo
NEXT_PUBLIC_SITE_URL=https://j11a310.p.ssafy.io
```

## 5. eventCollector서버

- 경로 : `/S11P21A310/backend/event-subscribe-server`

  > 이더리움 네트워크를 체크하며 나오는 이벤트들을 감지하여 elastic-search에 저장한다.  
  > elk 배포(6번 참조) 필요합니다.

- 빌드 스크립트

```
#!/bin/bash
export NVM_DIR="$HOME/.nvm"
source $NVM_DIR/nvm.sh
cd /home/ubuntu/applications/S11P21A310/smart-contract
/home/ubuntu/.nvm/versions/node/v20.15.0/bin/npx hardhat clean
/home/ubuntu/.nvm/versions/node/v20.15.0/bin/npx hardhat compile

cd /home/ubuntu/applications/S11P21A310/backend/event-subscribe-server

# 로그 파일 경로 설정
LOG_FILE="$HOME/logs/pm2_deploy/event-collector/$(date +"%Y-%m-%d_%H-%M-%S").log"
mkdir -p $(dirname "$LOG_FILE")

# 백그라운드 실행 및 로그 파일에 출력
/home/ubuntu/.nvm/versions/node/v20.15.0/bin/npm i &>> "$LOG_FILE" &
wait # 'npm install'이 완료될 때까지 대기

/home/ubuntu/.nvm/versions/node/v20.15.0/bin/pm2 restart eventCollector-ws &>> "$LOG_FILE" &
wait # 'pm2 restart'가 완료될 때까지 대기

echo "event-collector server deployment completed." &>> "$LOG_FILE"

```

- 환경변수
  - .env

```
# Ethereum 노드 URL (예: Infura)
ETHEREUM_NODE_RPC_URL=https://rpc.ssafy-blockchain.com
ETHEREUM_NODE_WS_URL=wss://ws.ssafy-blockchain.com

# 스마트 컨트랙트 주소
TOKEN_CONTRACT_ADDRESS=0x2Eda33b0E660ECDb6dfCCdA9c4b32c1459B2e6C7
TICKET_CONTRACT_ADDRESS=0x7a0F325F0D9eCFf77E765FD564Ef7ee897472b67
CONCERT_CONTRACT_ADDRESS=0x114d86FD1131DBD22044CFC9c97BAF310BF7DF08
PHOTO_CARD_CONTRACT_ADDRESS=0xAF929c8D409DF718d62781ac119E3a02297A6154

# 스마트 컨트랙트 ABI 파일 경로 (하드햇으로 생성된 파일 경로)
CONCERT_CONTRACT_ABI_PATH=/home/ubuntu/applications/S11P21A310/smart-contract/artifacts/contracts/ConcertManager.sol/ConcertManager.json
TICKET_CONTRACT_ABI_PATH=/home/ubuntu/applications/S11P21A310/smart-contract/artifacts/contracts/TicketNFT.sol/TicketNFT.json
TOKEN_CONTRACT_ABI_PATH=/home/ubuntu/applications/S11P21A310/smart-contract/artifacts/contracts/MelodyToken.sol/MelodyToken.json
PHOTO_CARD_CONTRACT_ABI_PATH=/home/ubuntu/applications/S11P21A310/smart-contract/artifacts/contracts/PhotoCardNFT.sol/PhotoCardNFT.json
# CONCERT_CONTRACT_ABI_PATH=.\tmp_abi\ConcertManager.json
# TICKET_CONTRACT_ABI_PATH=.\tmp_abi\TicketNFT.json
# TOKEN_CONTRACT_ABI_PATH=.\tmp_abi\MelodyToken.json

# Logstash 정보
LOGSTASH_HOST=localhost
LOGSTASH_PORT=5000

```

## 6. ELK

- 경로 : `/S11P21A310/backend/event-subscribe-server/elk`

  > 블록체인 네트워크 내의 이벤트를 기록하기 위한 로깅 서버

- 배포 스크립트 (docekr-compose.yml)

```
version: '3.3'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.17.0
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms4g -Xmx4g
    ports:
      - "9200:9200"
    volumes:
      - es_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:7.17.0
    container_name: logstash
    ports:
      - "5000:5000"
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:7.17.0
    container_name: kibana
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch

volumes:
  es_data:
    driver: local

```

- logstash 설정 (logstash.conf)

```
input {
  tcp {
    port => 5000
    codec => json
  }
}

filter {
  # 필요한 데이터 변환 또는 필터링 작업
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "event-logs-%{+YYYY.MM.dd}"
  }
}

```

## 7. jenkins

> 무중단 배포를 위한 CI/CD툴

- http://j11a310.p.ssafy.io:8080

- ID : jdbc
- pw : jdbc123@

- 빌드스크립트

```
pipeline {
    agent any

    environment {
        DEPLOY_SCRIPT = '~/scripts/'  // 스크립트가 위치한 디렉토리
        REPO_URL = 'https://lab.ssafy.com/s11-blochain-contract-sub1/S11P21A310.git'
        BRANCH = 'master'
        REMOTE_DIR = '/home/ubuntu/applications/S11P21A310'  // 원격 서버의 레포지토리 경로
    }

    triggers {
        // Generic Webhook Trigger
        GenericTrigger(
            genericVariables: [
                [key: 'ref', value: '$.ref'],
                [key: 'event_type', value: '$.event_type']
            ],
            causeString: 'Triggered on $ref',
            token: '9b9c46c83f8be1d0c270bebf9d062b7c',
            printContributedVariables: true,
            printPostContent: true
        )
    }

    stages {
        stage('코드 업데이트 및 배포') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@j11a310.p.ssafy.io '
                            cd ${REMOTE_DIR} &&
                            git pull origin ${BRANCH} &&
                            bash ${DEPLOY_SCRIPT}deploy_bank.sh &&
                            bash ${DEPLOY_SCRIPT}deploy_fe.sh &&
                            bash ${DEPLOY_SCRIPT}deploy_ipfs.sh &&
                            bash ${DEPLOY_SCRIPT}deploy_melodiket.sh
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo '배포 성공!'
        }
        failure {
            echo '배포 실패. 로그를 확인하세요.'
        }
    }
}

```
