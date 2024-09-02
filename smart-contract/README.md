# Hardhat으로 이더리움 개발하기

https://hardhat.org/hardhat-runner/docs/getting-started#quick-start

# 0. 사전작업

- env파일 (이거 내거니까 본인거 입력해서 하시길)

```
# .env

# 공통 변수
PRIVATE_KEY=<지갑 프라이빗키>

# 로컬 환경 변수
LOCALHOST_URL=http://127.0.0.1:8545

# 세폴리아 네트워크 변수
SEPOLIA_URL=https://sepolia.infura.io/v3/<api-key넣기>

# ssafy 네트워크
SSAFY_URL=https://rpc.ssafy-blockchain.com
CHAIN_ID=31221

ETHERSCAN_API_KEY=<이더스캔 api-key>
```

프로젝트 배포 관련 환경변수들을 넣는다.

# 1. 스마트 컨트랙트 작성 및 빌드

- 예시 - Storage.sol
    
    ```solidity
    // SPDX-License-Identifier: GPL-3.0
    pragma solidity ^0.8.24;
    
    /**
     * @title Storage
     * @dev Store & retrieve value in a variable
     * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
     */
    contract Storage {
    
        uint256 number;
    
        /**
         * @dev Store value in variable
         * @param num value to store
         */
        function store(uint256 num) public {
            number = num;
        }
    
        /**
         * @dev Return value 
         * @return value of 'number'
         */
        function retrieve() public view returns (uint256){
            return number;
        }
    }
    
    ```
    
- compile
    
    ```solidity
    npx hardhat compile // 빌드
    npx hardhat clean //오류나면 npx hardhat clean 으로 빌드파일 초기화하기
    ```
    

# 2. 배포하기

<aside>
💡

기본적으로 `hardhat.config.js` 에 배포 설정이 되어있으니 참고하면 된다.

</aside>

- 로컬호스트에 배포하는 경우
    
    ```solidity
    npx hardhat node // 하드햇 노드를 로컬에 생성 localhost:8485
    npx hardhat ignition deploy ./ignition/modules/Storage.js --network localhost --show-stack-traces  
    ```
    
- 싸피 네트워크에 배포하는 경우
    
    ```solidity
    npx hardhat ignition deploy ./ignition/modules/Storage.js --network ssafy --show-stack-traces  
    ```
    
- Sepolia 네트워크에 배포하는 경우
    
    ```solidity
    npx hardhat ignition deploy ./ignition/modules/Storage.js --network sepolia --show-stack-traces  
    ```
    

# 3. 배포 후 네트워크의 컨트랙트 테스트하기

- /scripts/ 디렉토리 아래에test_storage라는 테스트 예시 파일이 있다.
    
    ```solidity
    const { ethers } = require("hardhat");
    
    async function main() {
    //   const contractAddress = "0x5FB420359a239f6a92145164D1f5198Fd2002111"; // sepolia 배포된 계약 주소
      const contractAddress = "0x5FB420359a239f6a92145164D1f5198Fd2002111"; // ssafy 배포된 계약 주소
      const Storage = await ethers.getContractFactory("Storage");
    
      // 이미 배포된 계약에 연결
      const storage = await Storage.attach(contractAddress);
    
      // 계약에서 값을 설정합니다.
      const tx = await storage.store(42);
      await tx.wait(); // 트랜잭션이 블록에 포함될 때까지 기다림
    
      // 계약에서 값을 가져옵니다.
      const value = await storage.retrieve();
      console.log("Stored value is:", value.toString());
    }
    
    main().catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
    ```
    
- 이후 다음 명령어로 테스트해본다
    
    ```solidity
    npx hardhat run scripts/test_storage.js --network ssafy(or sepolia)
    ```
    

# (추가) 배포 전 테스트 하기

- /test  디렉토리 밑에 다음과 같은 Storage.js 파일이 있다
    
    ```solidity
    const { expect } = require("chai");
    
    describe("Storage contract", function () {
      
      let Storage;
      let storage;
      let owner;
    
      // 계약 배포 전 초기 설정
      beforeEach(async function () {
        Storage = await ethers.getContractFactory("Storage");
        [owner] = await ethers.getSigners(); // 테스트에 사용할 지갑 주소 설정
        storage = await Storage.deploy(); // 계약 배포 (deployed() 호출 불필요)
        // await storage.deployed();  // 이 줄을 제거하거나 주석 처리
      });
    
      it("Should store the value 42", async function () {
        await storage.store(42); // store 함수 호출
        expect(await storage.retrieve()).to.equal(42); // retrieve 함수가 올바른 값을 반환하는지 확인
      });
    
      it("Should update when store is called again", async function () {
        await storage.store(100); // 새로운 값 저장
        expect(await storage.retrieve()).to.equal(100); // 값이 올바르게 업데이트 되었는지 확인
    
        await storage.store(200); // 또 다른 값 저장
        expect(await storage.retrieve()).to.equal(200); // 값이 다시 업데이트 되었는지 확인
      });
    
      it("Should retrieve the correct initial value", async function () {
        expect(await storage.retrieve()).to.equal(0); // 초기 값이 0인지 확인
      });
    
    });
    
    ```
    
    - 자세한 사용법은 공식문서 참고하면 좋을듯
- 이후 test 명령어를 입력하면 test 디렉토리 하위의 모든 테스트들이 작동한다
    
    ```solidity
    npx hardhat test
    ```
    
- 한 파일만 하고싶으면
    
    ```solidity
    npx hardhat test test/Storage.js
    ```



# Sample Hardhat Project



```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
