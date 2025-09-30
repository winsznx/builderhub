import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Wallet, Coins, Image, Vote } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Tokens from './pages/Tokens'
import NFTs from './pages/NFTs'
import Governance from './pages/Governance'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { address, isConnected } = useAccount()
  const { open } = useWeb3Modal()

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Wallet },
    { id: 'tokens', name: 'Tokens', icon: Coins },
    { id: 'nfts', name: 'Build Proofs', icon: Image },
    { id: 'governance', name: 'Governance', icon: Vote }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                BuilderHub
              </h1>
              <p className="text-sm text-gray-400 mt-1">WalletConnect x Talent Protocol</p>
            </div>
            <button
              onClick={() => open()}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50"
            >
              {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-slate-900/30 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!isConnected ? (
          <div className="text-center py-20">
            <Wallet className="mx-auto h-16 w-16 text-purple-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-6">Connect your wallet to interact with BuilderHub</p>
            <button
              onClick={() => open()}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'tokens' && <Tokens />}
            {activeTab === 'nfts' && <NFTs />}
            {activeTab === 'governance' && <Governance />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-purple-500/20 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">
            Built for WalletConnect x Talent Protocol Contest • Sepolia Testnet
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App