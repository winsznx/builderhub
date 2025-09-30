# BuilderHub

A Web3 dApp showcasing WalletConnect integration with token management, soulbound NFTs, and governance features. Built for the WalletConnect x Talent Protocol Builder Contest.

![BuilderHub Dashboard](https://via.placeholder.com/800x400?text=BuilderHub+Dashboard)

## Live Demo

🌐 [builderhub.vercel.app](https://builderhub.vercel.app)

## Features

### Dashboard
- Real-time wallet balance tracking
- Overview of all deployed contracts
- Connected wallet information

### Token Management
- Transfer WinSZN (WSN) tokens
- Transfer Quorum (QUM) governance tokens
- Transaction status tracking
- Etherscan integration

### Proof of Build NFTs
- Mint soulbound NFTs for completed projects
- On-chain proof of work and achievements
- Non-transferable credentials
- Project metadata storage (name, description, GitHub link)

### Governance
- Delegate voting power with QUM tokens
- View current delegation status
- Track voting power
- Self-delegation support

## Smart Contracts (Sepolia Testnet)

| Contract | Address | Purpose |
|----------|---------|---------|
| WinSZN (WSN) | `0x4c073e42E74775361C06A726def4Dfa2171E0774` | ERC-20 utility token |
| Quorum (QUM) | `0xb2CCaf263c6a524ebFd817E93072943D4D960420` | ERC-20 governance token with voting |
| ProofOfBuild (POB) | `0xb7a6b90aD7BdC1710F39d959A64de68C5aaAe527` | ERC-721 soulbound NFT |

All contracts are verified on [Sepolia Etherscan](https://sepolia.etherscan.io).

## Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **WalletConnect Web3Modal** - Wallet connection
- **Wagmi** - React hooks for Ethereum
- **Viem** - Ethereum utilities

### Smart Contracts
- **Solidity ^0.8.20**
- **Hardhat** - Development environment
- **OpenZeppelin** - Secure contract libraries

### Deployment
- **Vercel** - Frontend hosting
- **Ethereum Sepolia** - Testnet deployment

## Local Development

### Prerequisites
- Node.js v18+
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH

### Installation

```bash
# Clone the repository
git clone https://github.com/winsznx/builderhub.git
cd builderhub

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

No environment variables needed for the frontend - all contract addresses are hardcoded in `src/contracts/contracts.js`.

## Project Structure

```
builderhub/
├── src/
│   ├── components/         # Reusable UI components (future)
│   ├── config/
│   │   └── wagmi.js       # WalletConnect & Wagmi configuration
│   ├── contracts/
│   │   └── contracts.js   # Contract addresses and ABIs
│   ├── pages/
│   │   ├── Dashboard.jsx  # Main dashboard
│   │   ├── Tokens.jsx     # Token transfer interface
│   │   ├── NFTs.jsx       # NFT minting interface
│   │   └── Governance.jsx # Voting delegation interface
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── public/
├── index.html
└── package.json
```

## Smart Contract Repository

Smart contracts source code: [github.com/winsznx/winszn-token](https://github.com/winsznx/winszn-token)

## Usage Guide

### 1. Connect Wallet
- Click "Connect Wallet" button
- Select MetaMask or use WalletConnect QR
- Ensure you're on Sepolia testnet

### 2. View Balances
- Navigate to Dashboard tab
- See real-time balances for WSN, QUM, and NFTs
- View voting power status

### 3. Transfer Tokens
- Go to Tokens tab
- Select WSN or QUM
- Enter recipient address and amount
- Confirm transaction in wallet

### 4. Mint Proof of Build NFT
- Go to Build Proofs tab
- Fill in project details
- Click "Mint Build Proof"
- NFT is non-transferable (soulbound)

### 5. Delegate Voting Power
- Go to Governance tab
- Enter delegate address (or use "Use my address")
- Confirm delegation transaction
- Voting power activates immediately

## WalletConnect Integration

This project demonstrates proper WalletConnect implementation:
- Web3Modal v3 integration
- Multiple wallet support (MetaMask, WalletConnect, etc.)
- Sepolia testnet configuration
- React hooks for contract interactions
- Transaction status tracking

## Known Limitations

- NFT metadata uses placeholder URIs
- No proposal creation/voting UI (delegation only)
- Basic token transfer only (no allowance/approve flow)
- Single network support (Sepolia only)

## Future Enhancements

- [ ] Full governance proposal system
- [ ] IPFS integration for NFT metadata
- [ ] Multi-chain support
- [ ] Token swapping functionality
- [ ] Enhanced NFT gallery with images
- [ ] Talent Protocol API integration

## Contributing

This is a contest submission project. Feel free to fork and adapt for your own use.

## License

MIT

## Author

Built by [@winsznx](https://github.com/winsznx)
## Acknowledgments

- WalletConnect team for Web3Modal
- OpenZeppelin for secure contract libraries
- Talent Protocol for contest inspiration

---

**Network:** Ethereum Sepolia Testnet  
**Get Sepolia ETH:** [Alchemy Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
