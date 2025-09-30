import { useAccount, useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { CONTRACTS, WINSZN_ABI, QUORUM_ABI, PROOFOFBUILD_ABI } from '../contracts/contracts'
import { Coins, Award, Vote, Loader2 } from 'lucide-react'

function Dashboard() {
  const { address } = useAccount()

  // Read WSN balance
  const { data: wsnBalance, isLoading: wsnLoading } = useReadContract({
    address: CONTRACTS.WINSZN,
    abi: WINSZN_ABI,
    functionName: 'balanceOf',
    args: [address]
  })

  // Read QUM balance
  const { data: qumBalance, isLoading: qumLoading } = useReadContract({
    address: CONTRACTS.QUORUM,
    abi: QUORUM_ABI,
    functionName: 'balanceOf',
    args: [address]
  })

  // Read QUM voting power
  const { data: votingPower, isLoading: votesLoading } = useReadContract({
    address: CONTRACTS.QUORUM,
    abi: QUORUM_ABI,
    functionName: 'getVotes',
    args: [address]
  })

  // Read NFT balance
  const { data: nftBalance, isLoading: nftLoading } = useReadContract({
    address: CONTRACTS.PROOFOFBUILD,
    abi: PROOFOFBUILD_ABI,
    functionName: 'balanceOf',
    args: [address]
  })

  const stats = [
    {
      title: 'WinSZN Balance',
      value: wsnLoading ? '...' : wsnBalance ? parseFloat(formatEther(wsnBalance)).toFixed(2) : '0',
      symbol: 'WSN',
      icon: Coins,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Quorum Balance',
      value: qumLoading ? '...' : qumBalance ? parseFloat(formatEther(qumBalance)).toFixed(2) : '0',
      symbol: 'QUM',
      icon: Vote,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Voting Power',
      value: votesLoading ? '...' : votingPower ? parseFloat(formatEther(votingPower)).toFixed(2) : '0',
      symbol: 'Votes',
      icon: Vote,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Build Proofs',
      value: nftLoading ? '...' : nftBalance ? nftBalance.toString() : '0',
      symbol: 'NFTs',
      icon: Award,
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
        <p className="text-gray-400">Overview of your BuilderHub assets</p>
      </div>

      {/* Wallet Address Card */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <p className="text-sm text-gray-400 mb-2">Connected Wallet</p>
        <p className="text-xl font-mono text-white">{address}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm text-gray-400 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.symbol}</p>
            </div>
          )
        })}
      </div>

      {/* Contract Addresses */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Deployed Contracts</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-slate-700">
            <span className="text-gray-400">WinSZN Token (WSN)</span>
            <a
              href={`https://sepolia.etherscan.io/address/${CONTRACTS.WINSZN}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-mono text-sm"
            >
              {CONTRACTS.WINSZN.slice(0, 10)}...{CONTRACTS.WINSZN.slice(-8)}
            </a>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-700">
            <span className="text-gray-400">Quorum Token (QUM)</span>
            <a
              href={`https://sepolia.etherscan.io/address/${CONTRACTS.QUORUM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-mono text-sm"
            >
              {CONTRACTS.QUORUM.slice(0, 10)}...{CONTRACTS.QUORUM.slice(-8)}
            </a>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-400">ProofOfBuild NFT (POB)</span>
            <a
              href={`https://sepolia.etherscan.io/address/${CONTRACTS.PROOFOFBUILD}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-mono text-sm"
            >
              {CONTRACTS.PROOFOFBUILD.slice(0, 10)}...{CONTRACTS.PROOFOFBUILD.slice(-8)}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard