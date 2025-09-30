// Your deployed contract addresses on Sepolia
export const CONTRACTS = {
  WINSZN: "0x4c073e42E74775361C06A726def4Dfa2171E0774",
  QUORUM: "0xb2CCaf263c6a524ebFd817E93072943D4D960420",
  PROOFOFBUILD: "0xb7a6b90aD7BdC1710F39d959A64de68C5aaAe527"
};

// Chain ID for Sepolia testnet
export const SEPOLIA_CHAIN_ID = 11155111;

// WinSZN Token ABI (ERC-20)
export const WINSZN_ABI = [
  {
    "inputs": [{"internalType": "address","name": "account","type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address","name": "to","type": "address"},
      {"internalType": "uint256","name": "amount","type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool","name": "","type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Quorum Governance Token ABI (ERC-20 + Votes)
export const QUORUM_ABI = [
  {
    "inputs": [{"internalType": "address","name": "account","type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address","name": "to","type": "address"},
      {"internalType": "uint256","name": "amount","type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool","name": "","type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "delegatee","type": "address"}],
    "name": "delegate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "account","type": "address"}],
    "name": "delegates",
    "outputs": [{"internalType": "address","name": "","type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "account","type": "address"}],
    "name": "getVotes",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// ProofOfBuild NFT ABI (ERC-721)
export const PROOFOFBUILD_ABI = [
  {
    "inputs": [{"internalType": "address","name": "owner","type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBuilds",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string","name": "projectName","type": "string"},
      {"internalType": "string","name": "description","type": "string"},
      {"internalType": "string","name": "githubLink","type": "string"},
      {"internalType": "string","name": "tokenURI","type": "string"}
    ],
    "name": "mintMyBuild",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];