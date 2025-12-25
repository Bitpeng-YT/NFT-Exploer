import React from 'react'
import NFTCard from './NFTCard'

interface NFT {
  name: string
  imageUrl: string
  tokenId: string
  contractAddress: string
}

interface NFTGridProps {
  nfts: NFT[]
}

export default function NFTGrid({ nfts }: NFTGridProps) {
  if (nfts.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No NFTs found for this address.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {nfts.map((nft) => (
        <NFTCard key={`${nft.contractAddress}-${nft.tokenId}`} {...nft} />
      ))}
    </div>
  )
}
