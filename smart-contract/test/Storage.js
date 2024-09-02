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
