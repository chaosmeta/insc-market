// src/config/wagmi.js
import { createConfig, http } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { metaMask, walletConnect } from '@wagmi/connectors'

// ⚠️ 替换为你自己的 WalletConnect Project ID
// 申请地址：https://cloud.walletconnect.com
const WC_PROJECT_ID = 'YOUR_WALLETCONNECT_PROJECT_ID'

export const config = createConfig({
  chains: [bsc],
  connectors: [
    metaMask(),
    walletConnect({ projectId: WC_PROJECT_ID }),
  ],
  transports: {
    [bsc.id]: http('https://bsc-dataseed1.binance.org'),
  },
})
