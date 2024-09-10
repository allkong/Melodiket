package com.ssafy.jdbc.melodiket.testService;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.*;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.*;
import org.web3j.protocol.exceptions.TransactionException;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.utils.Convert;
import org.web3j.utils.Numeric;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.security.InvalidAlgorithmParameterException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.Collections;
import java.util.List;

@Controller
@Slf4j
@RequestMapping("/test")
public class InteractionService {

    @GetMapping("/1")
    public String req() throws IOException {
        Web3j web3 = Web3j.build(new HttpService());  // defaults to http://localhost:8545/
        Web3ClientVersion web3ClientVersion = web3.web3ClientVersion().send();
        String clientVersion = web3ClientVersion.getWeb3ClientVersion();

        log.info(clientVersion);
        return clientVersion;
    }

    @GetMapping("/2")
    public String createKeystore() throws IOException, InvalidAlgorithmParameterException, CipherException, NoSuchAlgorithmException, NoSuchProviderException {
        try {
            // 1. ECKeyPair 생성
            ECKeyPair ecKeyPair = Keys.createEcKeyPair();

            // 2. 비밀번호 설정
            String password = "your_secure_password";

            // 3. Keystore JSON 생성
            WalletFile walletFile = Wallet.createStandard(password, ecKeyPair);

            // 4. WalletFile을 JSON 문자열로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            String keystoreJson = objectMapper.writeValueAsString(walletFile);

            // 6. Keystore JSON 문자열을 데이터베이스에 저장
            // walletRepository.saveKeystoreToDatabase("user_id", keystoreJson);
            log.info(keystoreJson);
            log.info("Keystore 가 데이터베이스에 저장되었습니다!");

        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    @GetMapping("/3")
    public String transaction() {
        try {
            // 1. Web3j 인스턴스 생성 (Infura를 통해 Sepolia 네트워크에 연결)
//            Web3j web3 = Web3j.build(new HttpService());
            Web3j web3 = Web3j.build(new HttpService("https://rpc.ssafy-blockchain.com"));
//            Web3j web3 = Web3j.build(new HttpService("https://sepolia.infura.io/v3/5176bb3c58f348d980f37320f2e4b60c"));

            // 2. 개인키로부터 Credentials 객체 생성
            String privateKey = "0x8633fbe69f16ba0c96d7a0d4a274dad4f45fb3922c5fdaba25e4858c56a35a5f";
//            String privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // local
            Credentials credentials = Credentials.create(privateKey);

            // 3. 배포된 컨트랙트 주소
//            String contractAddress = "0x03b1f0Ee96bf22Abb9043Dbda7F7159F154109f5";
            String contractAddress = "0x5FB420359a239f6a92145164D1f5198Fd2002111"; // ssafy
//            String contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // local

            // 4. 현재 계정의 nonce 가져오기
            EthGetTransactionCount ethGetTransactionCount = web3.ethGetTransactionCount(credentials.getAddress(), DefaultBlockParameterName.LATEST).send();
            BigInteger nonce = ethGetTransactionCount.getTransactionCount();

            // 5. store 함수 호출을 위한 Function 객체 생성
            Function function = new Function(
                    "store",
                    Collections.singletonList(new Uint256(BigInteger.valueOf(34))),
                    Collections.emptyList()
            );

            // 6. Function 인코딩 및 트랜잭션 가스 예상
            String encodedFunction = FunctionEncoder.encode(function);
            EthEstimateGas ethEstimateGas = web3.ethEstimateGas(
                            Transaction.createEthCallTransaction(credentials.getAddress(), contractAddress, encodedFunction))
                    .send();

            BigInteger gasLimit = ethEstimateGas.getAmountUsed();

            // 7. 기존 가스 가격 가져오기 및 증가시키기
            BigInteger gasPrice = BigInteger.ZERO; // 기본 가스 가격
            log.info(gasPrice.toString());
            log.info(gasLimit.toString());
            // 8. RawTransaction 생성
            RawTransaction rawTransaction = RawTransaction.createTransaction(
                    nonce,
                    gasPrice,
                    gasLimit,
                    contractAddress,
                    encodedFunction
            );

            // 9. 트랜잭션 서명
            byte[] signedMessage = TransactionEncoder.signMessage(rawTransaction, credentials);
            String hexValue = Numeric.toHexString(signedMessage);

            // 10. 서명된 트랜잭션 전송
            EthSendTransaction transactionResponse = web3.ethSendRawTransaction(hexValue).send();

            if (transactionResponse.hasError()) {
                log.error(transactionResponse.getError().getMessage());
            } else {
                String transactionHash = transactionResponse.getTransactionHash();
                // 11. 트랜잭션 해시 출력
                System.out.println("store() 트랜잭션 해시: " + transactionHash);
            }

            // 12. retrieve 함수 호출을 위한 Function 객체 생성
            Function retrieveFunction = new Function(
                    "retrieve",
                    Collections.emptyList(),
                    Collections.singletonList(new TypeReference<Uint256>() {})
            );

            // 13. retrieve 함수 호출 및 값 디코딩
            String encodedRetrieveFunction = FunctionEncoder.encode(retrieveFunction);
            Transaction retrieveTransaction = Transaction.createEthCallTransaction(
                    credentials.getAddress(),
                    contractAddress,
                    encodedRetrieveFunction
            );
            EthCall retrieveResponse = web3.ethCall(retrieveTransaction, DefaultBlockParameterName.LATEST).send();

            List<Type> someTypes = FunctionReturnDecoder.decode(retrieveResponse.getValue(), retrieveFunction.getOutputParameters());
            BigInteger storedValue = (BigInteger) someTypes.get(0).getValue();

            System.out.println("retrieve() 값: " + storedValue);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
