import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther } from 'viem'
import { CONTRACTS, QUORUM_ABI } from '../contracts/contracts'
import { Vote, Users, Loader2, CheckCircle, XCircle } from 'lucide-react'

function Governance() {
  const { address } = useAccount()
  const [delegateAddress, setDelegateAddress] = useState('')

  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Read QUM balance
  const { data: qumBalance } = useReadContract({
    address: CONTRACTS.QUORUM,
    abi: QUORUM_ABI,
    functionName: 'balanceOf',
    args: [address]
  })

  // Read voting power
  const { data: votingPower } = useReadContract({
    address: CONTRACTS.QUORUM,
    abi: QUORUM_ABI,
    functionName: 'getVotes',
    args: [address]
  })

  // Read current delegate
  const { data: currentDelegate } = useReadContract({
    address: CONTRACTS.QUORUM,
    abi: QUORUM_ABI,
    functionName: 'delegates',
    args: [address]
  })

  const handleDelegate = async (e) => {
    e.preventDefault()
    
    if (!delegateAddress) {
      alert('Please enter a delegate address')
      return
    }

    try {
      writeContract({
        address: CONTRACTS.QUORUM,
        abi: QUORUM_ABI,
        functionName: 'delegate',
        args: [delegateAddress]
      })
    } catch (err) {
      console.error('Delegate error:', err)
    }
  }

  const handleSelfDelegate = () => {
    setDelegateAddress(address)
  }

  const isDelegatedToSelf = currentDelegate?.toLowerCase() === address?.toLowerCase()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Governance</h2>
        <p className="text-gray-400">Manage your voting power and participate in governance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Vote className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-sm text-gray-400 mb-1">QUM Balance</h3>
          <p className="text-3xl font-bold text-white">
            {qumBalance ? parseFloat(formatEther(qumBalance)).toFixed(2) : '0'}
          </p>
          <p className="text-sm text-gray-500 mt-1">Governance Tokens</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Vote className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-sm text-gray-400 mb-1">Voting Power</h3>
          <p className="text-3xl font-bold text-white">
            {votingPower ? parseFloat(formatEther(votingPower)).toFixed(2) : '0'}
          </p>
          <p className="text-sm text-gray-500 mt-1">Active Votes</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="text-sm text-gray-400 mb-1">Delegation Status</h3>
          <p className="text-xl font-bold text-white">
            {isDelegatedToSelf ? 'Self' : 'Delegated'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {currentDelegate === '0x0000000000000000000000000000000000000000' 
              ? 'Not delegated'
              : isDelegatedToSelf 
                ? 'You control your votes'
                : 'Votes delegated to another'}
          </p>
        </div>
      </div>

      {/* Delegation Warning */}
      {votingPower?.toString() === '0' && qumBalance?.toString() !== '0' && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <XCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-2">Action Required!</h3>
              <p className="text-gray-300 mb-4">
                You have {qumBalance ? parseFloat(formatEther(qumBalance)).toFixed(2) : '0'} QUM tokens 
                but no voting power. You must delegate to yourself or another address to activate your votes.
              </p>
              <button
                onClick={handleSelfDelegate}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold transition-all"
              >
                Delegate to Myself
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Current Delegate Info */}
      {currentDelegate && currentDelegate !== '0x0000000000000000000000000000000000000000' && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Current Delegate</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Votes delegated to:</p>
              <p className="text-lg font-mono text-white">{currentDelegate}</p>
              {isDelegatedToSelf && (
                <p className="text-sm text-green-400 mt-2">✓ You control your voting power</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delegate Form */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Delegate Voting Power</h3>
        <p className="text-gray-400 mb-4">
          Delegate your voting power to yourself or another address. This doesn't transfer your tokens,
          only the voting rights.
        </p>
        
        <form onSubmit={handleDelegate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Delegate Address
            </label>
            <input
              type="text"
              value={delegateAddress}
              onChange={(e) => setDelegateAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={handleSelfDelegate}
              className="mt-2 text-sm text-purple-400 hover:text-purple-300"
            >
              Use my address
            </button>
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
                  <span>Delegating votes...</span>
                </div>
              )}
              {isSuccess && (
                <div className="flex items-center space-x-3 text-green-400 border-green-400/20 bg-green-400/10">
                  <CheckCircle className="h-5 w-5" />
                  <div>
                    <p>Delegation successful! 🎉</p>
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

          <button
            type="submit"
            disabled={isPending || isConfirming}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Vote className="h-5 w-5" />
                <span>Delegate Votes</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-400 mb-2">About Governance</h3>
        <ul className="space-y-2 text-gray-300">
          <li>• Each QUM token = 1 vote</li>
          <li>• You must delegate to activate voting power</li>
          <li>• Delegating doesn't transfer your tokens</li>
          <li>• You can change your delegate anytime</li>
          <li>• Delegate to yourself to control your own votes</li>
        </ul>
      </div>
    </div>
  )
}

export default Governance