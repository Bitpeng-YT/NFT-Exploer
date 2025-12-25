import React, { useState } from 'react'
import AddressForm from './components/AddressForm'
import NFTGrid from './components/NFTGrid'

interface NFT {
  name: string
  imageUrl: string
  tokenId: string
  contractAddress: string
}

export default function App() {
  const [address, setAddress] = useState<string>('')
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // 🔴 请将此处替换为你从 Alchemy 申请的 API Key
  const ALCHEMY_API_KEY = 'ALCHEMY_API_KEY'; 

  const fetchNFTs = async (addr: string) => {
    setLoading(true)
    setError(null)
    setNfts([])

    // 检查地址是否为空
    if (!addr) {
      setLoading(false);
      return;
    }

    try {
      // 使用 Alchemy 的 getNFTs 接口
      const url = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}/getNFTs?owner=${addr}&withMetadata=true`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      })

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      const data = await res.json()

      // Alchemy 返回的数据在 data.ownedNfts 数组中
      // 我们需要根据新的结构映射数据
      const assets = data.ownedNfts.map((nft: any) => {
        // 尝试获取图片，处理各种可能的路径
        const img = nft.media?.[0]?.gateway || nft.metadata?.image || '';
        
        return {
          name: nft.title || 'Unnamed NFT', // Alchemy 使用 title
          imageUrl: img,
          tokenId: nft.id.tokenId, // Token ID 位置不同
          contractAddress: nft.contract.address,
        }
      })

      setNfts(assets)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to fetch NFTs')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        NFT Portfolio Viewer
      </h1>
      
      {/* 简单的提示，提醒填入 Key */}
      {ALCHEMY_API_KEY === 'YOUR_ALCHEMY_API_KEY_HERE' && (
        <div className="max-w-md mx-auto mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">注意</p>
          <p>请在代码 src/App.tsx 中填入你的 Alchemy API Key，否则无法获取数据。</p>
        </div>
      )}

      <AddressForm onSubmit={fetchNFTs} loading={loading} />
      {error && (
        <p className="text-center text-red-600 mt-4">{error}</p>
      )}
      <NFTGrid nfts={nfts} />
    </div>
  )
}
