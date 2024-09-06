import { Buffer } from 'buffer';
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import localforage from "localforage";
import * as bip39 from 'bip39';

import { encryptPrivateKey, decryptPrivateKey } from "./cryptoUtils";

// 브라우저 환경에서 전역 Buffer 객체 설정
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

// .env 파일에서 환경 변수 읽기
const KEY = process.env.REACT_APP_ALL_THAT_NODE_API_KEY;
const ETHEREUM_KEY_NAME = "ethereum-key";

const App = () => {
  const [privateKey, setPrivateKey] = useState(null);
  const [generatedMnemonic, setGeneratedMnemonic] = useState(null);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(true);
  const [key, setKey] = useState(null);
  const [selectedPassword, setSelectedPassword] = useState("");
  const [error, setError] = useState("");
  const [restoringRawMnemonic, setRestoringRawMnemonic] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [isValidMnemonic, setIsValidMnemonic] = useState(false);

  useEffect(() => {
    const fetchKey = async () => {
      await localforage.iterate((value, key) => {
        if (key === ETHEREUM_KEY_NAME) {
          setKey(value);
        }
      });
    };

    fetchKey();
  }, []);

  const handleCreateNewKey = async () => {
    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    try {
      const mnemonic = bip39.generateMnemonic(128, null, bip39.wordlists.korean);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const hdNode = ethers.HDNodeWallet.fromSeed(seed);
      const wallet = new ethers.Wallet(hdNode.privateKey);
      const { encryptedData, iv, salt } = await encryptPrivateKey(wallet.privateKey, newPassword);

      await localforage.setItem(ETHEREUM_KEY_NAME, { encryptedData, iv, salt });

      setKey({ encryptedData, iv, salt });
      setGeneratedMnemonic(mnemonic);

      setNewPassword("");
      setError("");
    } catch (err) {
      setError("Error creating or encrypting the wallet");
      console.error(err);
    }
  };

  const handlePasswordSubmit = async (key) => {
    if (!selectedPassword) {
      setError("Password is required.");
      return;
    }

    try {
      const decryptedPrivateKey = await decryptPrivateKey(
        new Uint8Array(key.encryptedData),
        selectedPassword,
        new Uint8Array(key.iv),
        new Uint8Array(key.salt)
      );

      const provider = new ethers.JsonRpcProvider(`https://ethereum-sepolia.g.allthatnode.com/full/evm/${KEY}?apiKey=${KEY}`);
      const wallet = new ethers.Wallet(decryptedPrivateKey, provider);
      setPrivateKey(decryptedPrivateKey);
      setAddress(wallet.address);
      const walletBalance = await provider.getBalance(wallet.address);
      setBalance(ethers.formatEther(walletBalance));

      setShowPasswordInput(false);
      setError("");
    } catch (err) {
      alert("Failed to decrypt the private key. Check your password.");
      console.error(err);
      setPrivateKey(null);
    }
  };

  const handleDeleteKey = async (key) => {
    try {
      await localforage.removeItem(ETHEREUM_KEY_NAME);
      setKey(null);
      setPrivateKey(null);

      setGeneratedMnemonic(null);
    } catch (err) {
      setError("Error deleting the key.");
    }
  };


  const handleRestoreWallet = async (rawMnemonic, resetPassword) => {
    if (!bip39.validateMnemonic(rawMnemonic, bip39.wordlists.korean)) {
      alert('Invalid mnemonic code');
      return;
    }

    try {
      const seed = await bip39.mnemonicToSeed(rawMnemonic);
      const hdNode = ethers.HDNodeWallet.fromSeed(seed);
      const wallet = new ethers.Wallet(hdNode.privateKey);
      setPrivateKey(wallet.privateKey);
      setAddress(wallet.address);
      const provider = new ethers.JsonRpcProvider(`https://ethereum-sepolia.g.allthatnode.com/full/evm/${KEY}?apiKey=${KEY}`);
      const walletBalance = await provider.getBalance(wallet.address);
      setBalance(ethers.formatEther(walletBalance));
      
      const { encryptedData, iv, salt } = await encryptPrivateKey(wallet.privateKey, resetPassword);
      await localforage.setItem(ETHEREUM_KEY_NAME, { encryptedData, iv, salt });
      setKey({ encryptedData, iv, salt });

      setGeneratedMnemonic(null);
      setRestoringRawMnemonic('');
      setResetPassword('');
      alert('Wallet restored successfully');
    } catch (err) {
      alert('Failed to restore wallet');
      console.error(err);
    }
  }

  useEffect(() => {
    const isValidMnemonic = bip39.validateMnemonic(restoringRawMnemonic, bip39.wordlists.korean);
    setIsValidMnemonic(isValidMnemonic);
  }, [restoringRawMnemonic]);

  return (
    <div>
      <h1>Your Ethereum Wallet on Sepolia</h1>
      {generatedMnemonic &&
        <p>
          <div>Copy it to <strong>offline</strong>. It will be used to restore your wallet.</div>
          <strong>Generated Mnemonic:</strong> {generatedMnemonic}
        </p>
      }

      {!key && (
        <div style={{ marginBottom: "20px" }}>
          <h2>Create New Wallet</h2>
          <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={handleCreateNewKey}>Create and Save New Key</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
      
      {key && (
        <div style={{ marginBottom: "20px" }}>
          <h2>Saved Key</h2>
          <div style={{ marginBottom: "10px" }}>
            <input type="password" placeholder="Enter password" onChange={(e) => setSelectedPassword(e.target.value)} />
            <button onClick={() => handlePasswordSubmit(key)}>Submit</button>
            <button onClick={() => handleDeleteKey(key)} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
              Delete Key
            </button>
          </div>
        </div>
      )}

      {privateKey && !showPasswordInput && (
        <div>
          <p>
            <strong>Private Key:</strong> {privateKey}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Balance:</strong> {balance} ETH
          </p>
        </div>
      )}

      <hr />

      <div>
        <h2>Restore wallet by Mnemonic code</h2>
        <input type="text" placeholder="Enter your mnemonic code (splitter: whitespace)" value={restoringRawMnemonic} onChange={(e) => setRestoringRawMnemonic(e.target.value)} style={{width: '50rem'}} />
        <div>
          <button onClick={() => setRestoringRawMnemonic('')}>Clear</button>
          {isValidMnemonic && (
            <span>
              <input type="password" placeholder="Enter new password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} />
              <button onClick={() => handleRestoreWallet(restoringRawMnemonic, resetPassword)}>Restore</button>
            </span>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default App;
