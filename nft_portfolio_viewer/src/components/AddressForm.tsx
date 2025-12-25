import React, { useState, FormEvent } from 'react'
import { Search } from 'lucide-react'

interface AddressFormProps {
  onSubmit: (address: string) => void
  loading: boolean
}

export default function AddressForm({ onSubmit, loading }: AddressFormProps) {
  const [address, setAddress] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return
    onSubmit(address.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex space-x-2">
      <input
        type="text"
        placeholder="Enter Ethereum address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        {loading ? <Search className="animate-spin mr-2" size={20} /> : <Search size={20} />}
        <span className="ml-1">Search</span>
      </button>
    </form>
  )
}
