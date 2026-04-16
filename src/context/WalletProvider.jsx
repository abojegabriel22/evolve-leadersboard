import React, { useState } from "react";
import { ethers } from "ethers";
import { WalletContext } from "./WalletContext";

const TOKEN_ADDRESS = "0xD3e261612E1d0076153c1D1C37585F7dEC6AECa5";
const MIN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [chainId, setChainId] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install a wallet!");
      return;
    }

    try {
      // 1. Request accounts first
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];

      // 2. FORCE the switch to BSC (Chain ID 56 / 0x38)
      const bscChainId = "0x38"; 
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: bscChainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: bscChainId,
              chainName: 'Binance Smart Chain',
              nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com/'],
            }],
          });
        } else {
          throw switchError; // Stop if user rejects switch
        }
      }

      // 3. IMPORTANT: Re-initialize provider AFTER the network switch
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      
      setAccount(userAddress);
      setChainId(network.chainId);
      
      // 4. Trigger balance fetch and sync
      await fetchBalance(userAddress, provider);

    } catch (error) {
      console.error("Connection/Switch error:", error);
    }
  };

  // 1. Function to Fetch Balance AND Sync with Backend
  const fetchBalance = async (userAddress, provider) => {
    console.log("STEP 1: fetchBalance started for", userAddress); // Log this
    try {
      const contract = new ethers.Contract(TOKEN_ADDRESS, MIN_ABI, provider);
      const bal = await contract.balanceOf(userAddress);
      const decimals = await contract.decimals();
      const formattedBalance = ethers.formatUnits(bal, decimals);
      
      setBalance(formattedBalance);
      console.log("STEP 2: Balance formatted:", formattedBalance); // Log this

      // Inside WalletProvider.jsx -> fetchBalance function
      const response = await fetch("https://crypto-api-hsdj.onrender.com/api/evolve", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: userAddress.toLowerCase(),
          chain: "BSC", 
          evolveAmount: parseFloat(formattedBalance),
          amountDollars: 0 
        })
      });

      // If the POST is successful, you could even emit a custom event 
      // if you wanted to be super fancy, but the useEffect [account] 
      // fix above is usually enough.
      if (response.ok) {
        console.log("Database updated.");
      }

      const result = await response.text();
      console.log("STEP 3: Backend Response:", result); // Log this

    } catch (err) {
      console.error("SYNC ERROR:", err);
    }
  };

  // 2. Main Connection Logic

  return (
    <WalletContext.Provider value={{ account, balance, connectWallet, chainId }}>
      {children}
    </WalletContext.Provider>
  );
};