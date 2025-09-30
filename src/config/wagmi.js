import { createWeb3Modal } from '@web3modal/wagmi/react'
import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { walletConnect, injected } from 'wagmi/connectors'

const projectId = '421bf0713fb210162a29904cf17b84b8'

const chains = [sepolia]

export const config = createConfig({
  chains,
  transports: {
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com')  // ← Add custom RPC
  },
  connectors: [
    walletConnect({ projectId, showQrModal: false }),
    injected()
  ]
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#3b82f6'
  }
})