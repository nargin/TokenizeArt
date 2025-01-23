<script setup lang="ts">
import { ref } from 'vue'
import { useWriteContract, useAccount } from '@wagmi/vue'
import { parseAbi } from 'viem'

const contractAbi = parseAbi([
    'function mintNFT(address recipient, string memory tokenURI) public returns (uint256)',
])

const loading = ref(false)
const mintError = ref('')
const { address } = useAccount()

const { data: hash, writeContract } = useWriteContract()

const handleMint = async () => {
  try {
    loading.value = true
    mintError.value = ''

    if (!address.value) {
      throw new Error('Wallet not connected')
    }

    writeContract({
      address: '0x3ea35A242175b82821F2984693640326Bb706b1d',
      abi: contractAbi,
      functionName: 'mintNFT',
      args: [address.value, 'https://4a38e650f4c6b79cec554097a5044ce1.ipfscdn.io/ipfs/bafybeifoszgotjs7u3zh6ebvjivegjn3hz2bmkvvzjgklip367o66pcusm/']
    })

  } catch (err: any) {
    mintError.value = err.message || 'Error minting NFT'
  } finally {
    loading.value = false
  }
}
</script>



<style>
.connect-container {
  background: #000000;
  color: #FFFFFF;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 600px;
  margin: 2rem auto;
  border: 3px solid #FFFFFF;
}

.connect-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.connect-button {
  background: #FFFFFF;
  color: #000000;
  border: none;
  padding: 1rem 2rem;
  margin: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.connect-button:hover {
  background: #000000;
  color: #FFFFFF;
  outline: 2px solid #FFFFFF;
}

.connect-button:focus {
  outline: 4px solid #FFFFFF;
  outline-offset: 2px;
}

.status-container {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #FFFFFF;
  font-size: 1.1rem;
}

.error-message {
  color: #FFFFFF;
  background: #000000;
  border: 2px solid #FFFFFF;
  padding: 1rem;
  margin-top: 1rem;
  font-weight: 600;
}

.form-input {
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  background: #FFFFFF;
  color: #000000;
  border: none;
  font-size: 1.1rem;
}

.form-label {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.attribute-container {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #FFFFFF;
}

.attribute-row {
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.attribute-input {
  flex: 1;
  padding: 1rem;
  background: #FFFFFF;
  color: #000000;
  border: none;
  font-size: 1.1rem;
}

.remove-button {
  background: #FFFFFF;
  color: #000000;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.remove-button:hover {
  background: #000000;
  color: #FFFFFF;
  outline: 2px solid #FFFFFF;
}
</style>

<template>
  <div class="connect-container">
    <h2 class="connect-title">Mint NFT</h2>
    
    <form @submit.prevent="handleMint">
      <button 
        type="submit" 
        class="connect-button"
        :disabled="loading"
      >
        {{ loading ? 'Minting...' : 'Mint NFT' }}
      </button>
    </form>

    <div v-if="hash" class="error-message">
      Transaction hash: {{ hash }}
    </div>

    <div v-if="mintError" class="error-message">
      {{ mintError }}
    </div>
  </div>
</template>