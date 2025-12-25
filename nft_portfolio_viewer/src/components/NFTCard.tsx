import React from 'react'

interface NFTCardProps {
  name: string
  imageUrl: string
  tokenId: string
  contractAddress: string
}

export default function NFTCard({ name, imageUrl, tokenId, contractAddress }: NFTCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
      <img
        src={imageUrl || 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80'}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name || 'Unnamed NFT'}</h3>
        <p className="text-sm text-gray-500 mt-1 truncate">
          Token #{tokenId}
        </p>
        <p className="text-xs text-gray-400 mt-1 truncate">
          {contractAddress.slice(0, 6)}…{contractAddress.slice(-4)}
        </p>
      </div>
    </div>
  )
}
