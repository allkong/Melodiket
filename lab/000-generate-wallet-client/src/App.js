import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import localforage from "localforage";
import { encryptPrivateKey, decryptPrivateKey } from "./cryptoUtils";

// .env 파일에서 환경 변수 읽기
const KEY = process.env.REACT_APP_ALL_THAT_NODE_API_KEY;

const App = () => {
  const [privateKey, setPrivateKey] = useState(null);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(true);
  const [keyList, setKeyList] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchKeys = async () => {
      const keys = [];
      await localforage.iterate((value, key) => {
        if (key.startsWith("ethereum-key-")) {
          keys.push({ key, value });
        }
      });
      setKeyList(keys);
    };

    fetchKeys();
  }, []);

  const handleCreateNewKey = async () => {
    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    try {
      const provider = new ethers.JsonRpcProvider(`https://ethereum-sepolia.g.allthatnode.com/full/evm/${KEY}?apiKey=${KEY}`);
      const wallet = ethers.Wallet.createRandom();
      const { encryptedData, iv, salt } = await encryptPrivateKey(wallet.privateKey, newPassword);

      const keyName = `ethereum-key-${Date.now()}`;
      await localforage.setItem(keyName, { encryptedData, iv, salt });

      setKeyList((prevList) => [...prevList, { key: keyName, value: { encryptedData, iv, salt } }]);
      setNewPassword("");
      setError("");
    } catch (err) {
      setError("Error creating or encrypting the wallet.");
    }
  };

  const handlePasswordSubmit = async (key) => {
    if (!selectedPassword) {
      setError("Password is required.");
      return;
    }

    try {
      const keyData = keyList.find((item) => item.key === key).value;
      const decryptedPrivateKey = await decryptPrivateKey(
        new Uint8Array(keyData.encryptedData),
        selectedPassword,
        new Uint8Array(keyData.iv),
        new Uint8Array(keyData.salt)
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
    }
  };

  const handleDeleteKey = async (key) => {
    try {
      await localforage.removeItem(key);
      setKeyList((prevList) => prevList.filter((item) => item.key !== key));
    } catch (err) {
      setError("Error deleting the key.");
    }
  };

  return (
    <div>
      <h1>Your Ethereum Wallet on Sepolia</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Create New Wallet</h2>
        <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <button onClick={handleCreateNewKey}>Create and Save New Key</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Saved Keys</h2>
        {keyList.map(({ key }) => (
          <div key={key} style={{ marginBottom: "10px" }}>
            <span>{key}</span>
            <input type="password" placeholder="Enter password" onChange={(e) => setSelectedPassword(e.target.value)} />
            <button onClick={() => handlePasswordSubmit(key)}>Submit</button>
            <button onClick={() => handleDeleteKey(key)} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
              Delete Key
            </button>
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default App;
