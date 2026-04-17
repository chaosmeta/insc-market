// src/App.jsx
import { useState } from 'react'
import { useAccount } from 'wagmi'
import StatsBar from './components/StatsBar'
import { MintBar, BuybackPanel } from './components/MintBar'
import MarketGrid from './components/MarketGrid'
import MyInscriptions from './components/MyInscriptions'
import WalletModal from './components/WalletModal'

export default function App() {
  const { address, isConnected } = useAccount()
  const [tab, setTab] = useState('market')
  const [showWallet, setShowWallet] = useState(false)

  return (
    <div className="app">
      <nav>
        <div className="container nav-inner">
          <div className="logo">INSC<span>/</span>MARKET</div>
          <div className="nav-right">
            <div className="chain-badge">● BSC</div>
            <button className={`wallet-btn ${isConnected ? 'connected' : ''}`} onClick={() => setShowWallet(true)}>
              {isConnected ? address.slice(0,6) + '...' + address.slice(-4) : '连接钱包'}
            </button>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="hero">
          <div className="hero-title">铭文市场</div>
          <div className="hero-name">$TICKER • INSC-20 • BSC</div>
          <StatsBar />
        </div>
        {isConnected && <MintBar address={address} />}
        <BuybackPanel />
        <div className="tabs">
          {[{key:'market',label:'市场挂单'},{key:'mine',label:'我的铭文'}].map(t => (
            <div key={t.key} className={`tab ${tab===t.key?'active':''}`} onClick={() => setTab(t.key)}>{t.label}</div>
          ))}
        </div>
        {tab === 'market' && <MarketGrid address={address} />}
        {tab === 'mine'   && <MyInscriptions address={address} />}
      </div>
      {showWallet && <WalletModal onClose={() => setShowWallet(false)} />}
    </div>
  )
}
