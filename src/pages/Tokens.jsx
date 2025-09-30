import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import { CONTRACTS, WINSZN_ABI, QUORUM_ABI } from '../contracts/contracts'
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react'

function Tokens() {
  const { address } = useAccount()
  const [selectedToken, setSelectedToken] = useState('WSN')
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Read WSN balance
  const { data: wsnBalance } = useReadContract({
    address: CONTRACTS.WINSZN,
    abi: WINSZN_ABI,
    functionName: 'balanceOf',
    args: [address]
  })

  // Read QUM balance
  const { data: qumBalance } = useReadContract({
    address: CONTRACTS.QUORUM,
    abi: QUORUM_ABI,
    functionName: 'balanceOf',
    args: [address]
  })

  const handleTransfer = async (e) => {
    e.preventDefault()
    
    if (!recipient || !amount) {
      alert('Please fill in all fields')
      return
    }

    try {
      const contractAddress = selectedToken === 'WSN' ? CONTRACTS.WINSZN : CONTRACTS.QUORUM
      const abi = selectedToken === 'WSN' ? WINSZN_ABI : QUORUM_ABI

      writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'transfer',
        args: [recipient, parseEther(amount)]
      })
    } catch (err) {
      console.error('Transfer error:', err)
    }
  }

  const resetForm = () => {
    setRecipient('')
    setAmount('')
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Token Transfer</h2>
        <p className="text-gray-400">Send WSN or QUM tokens to any address</p>
      </div>

      {/* Token Selection */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Your Balances</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedToken('WSN')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedToken === 'WSN'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">WinSZN</p>
                <p className="text-2xl font-bold text-white">
                  {wsnBalance ? parseFloat(formatEther(wsnBalance)).toFixed(2) : '0'}
                </p>
                <p className="text-sm text-gray-500">WSN</p>
              </div>
              {selectedToken === 'WSN' && (
                <CheckCircle className="h-6 w-6 text-blue-500" />
              )}
            </div>
          </button>

          <button
            onClick={() => setSelectedToken('QUM')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedToken === 'QUM'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Quorum</p>
                <p className="text-2xl font-bold text-white">
                  {qumBalance ? parseFloat(formatEther(qumBalance)).toFixed(2) : '0'}
                </p>
                <p className="text-sm text-gray-500">QUM</p>
              </div>
              {selectedToken === 'QUM' && (
                <CheckCircle className="h-6 w-6 text-purple-500" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Transfer Form */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">
          Send {selectedToken}
        </h3>
        
        <form onSubmit={handleTransfer} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Amount
            </label>
            <input
              type="number"
              step="0.000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              Available: {selectedToken === 'WSN' 
                ? (wsnBalance ? parseFloat(formatEther(wsnBalance)).toFixed(4) : '0')
                : (qumBalance ? parseFloat(formatEther(qumBalance)).toFixed(4) : '0')
              } {selectedToken}
            </p>
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
                  <span>Transaction confirming...</span>
                </div>
              )}
              {isSuccess && (
                <div className="flex items-center space-x-3 text-green-400 border-green-400/20 bg-green-400/10">
                  <CheckCircle className="h-5 w-5" />
                  <div>
                    <p>Transfer successful!</p>
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isPending || isConfirming ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send {selectedToken}</span>
                </>
              )}
            </button>
            {isSuccess && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
              >
                New Transfer
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Tokens