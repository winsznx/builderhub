import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { CONTRACTS, PROOFOFBUILD_ABI } from '../contracts/contracts'
import { Award, Loader2, CheckCircle, XCircle, ExternalLink } from 'lucide-react'

function NFTs() {
  const { address } = useAccount()
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [githubLink, setGithubLink] = useState('')

  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Read NFT balance
  const { data: nftBalance } = useReadContract({
    address: CONTRACTS.PROOFOFBUILD,
    abi: PROOFOFBUILD_ABI,
    functionName: 'balanceOf',
    args: [address]
  })

  // Read total builds
  const { data: totalBuilds } = useReadContract({
    address: CONTRACTS.PROOFOFBUILD,
    abi: PROOFOFBUILD_ABI,
    functionName: 'totalBuilds'
  })

  const handleMint = async (e) => {
    e.preventDefault()
    
    if (!projectName || !description) {
      alert('Please fill in project name and description')
      return
    }

    try {
      writeContract({
        address: CONTRACTS.PROOFOFBUILD,
        abi: PROOFOFBUILD_ABI,
        functionName: 'mintMyBuild',
        args: [
          projectName,
          description,
          githubLink || 'https://github.com',
          'ipfs://placeholder'
        ]
      })
    } catch (err) {
      console.error('Mint error:', err)
    }
  }

  const resetForm = () => {
    setProjectName('')
    setDescription('')
    setGithubLink('')
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Proof of Build NFTs</h2>
        <p className="text-gray-400">Mint soulbound NFTs to prove your builder achievements</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-8 w-8 text-orange-400" />
          </div>
          <h3 className="text-sm text-gray-400 mb-1">Your NFTs</h3>
          <p className="text-3xl font-bold text-white">
            {nftBalance ? nftBalance.toString() : '0'}
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-sm text-gray-400 mb-1">Total Builds</h3>
          <p className="text-3xl font-bold text-white">
            {totalBuilds ? totalBuilds.toString() : '0'}
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-sm text-gray-400 mb-1">Type</h3>
          <p className="text-xl font-bold text-white">Soulbound</p>
          <p className="text-xs text-gray-500 mt-1">Non-transferable</p>
        </div>
      </div>

      {/* Mint Form */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Mint New Build Proof</h3>
        
        <form onSubmit={handleMint} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My Awesome DApp"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Built a decentralized application with smart contracts..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              GitHub Link (Optional)
            </label>
            <input
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Transaction Status */}
          {(isPending || isConfirming || isSuccess || error) && (
            <div className="p-4 rounded-lg border">
              {isPending && (
                <div className="flex items-center space-x-3 text-yellow-400 border-yellow-400/20 bg-yellow-400/10">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Waiting for wallet approval...</span>
                </div>
              )}
              {isConfirming && (
                <div className="flex items-center space-x-3 text-blue-400 border-blue-400/20 bg-blue-400/10">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Minting your NFT...</span>
                </div>
              )}
              {isSuccess && (
                <div className="flex items-center space-x-3 text-green-400 border-green-400/20 bg-green-400/10">
                  <CheckCircle className="h-5 w-5" />
                  <div>
                    <p>NFT minted successfully! 🎉</p>
                    <a
                      href={`https://sepolia.etherscan.io/tx/${hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline"
                    >
                      View on Etherscan
                    </a>
                  </div>
                </div>
              )}
              {error && (
                <div className="flex items-center space-x-3 text-red-400 border-red-400/20 bg-red-400/10">
                  <XCircle className="h-5 w-5" />
                  <span>Error: {error.message}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isPending || isConfirming}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-orange-500/50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isPending || isConfirming ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Minting...</span>
                </>
              ) : (
                <>
                  <Award className="h-5 w-5" />
                  <span>Mint Build Proof</span>
                </>
              )}
            </button>
            {isSuccess && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
              >
                Mint Another
              </button>
            )}
          </div>
        </form>
      </div>

      {/* View on OpenSea */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">View Your NFTs</h3>
        <p className="text-gray-400 mb-4">
          Check out your ProofOfBuild NFTs on OpenSea Testnet
        </p>
        <a
          href={`https://testnets.opensea.io/assets/sepolia/${CONTRACTS.PROOFOFBUILD}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
        >
          <span>View on OpenSea</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

export default NFTs