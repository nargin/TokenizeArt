<script setup lang="ts">
import { useAccount, useDisconnect } from '@wagmi/vue'

const { address, chainId, status } = useAccount()
const { disconnect } = useDisconnect()
</script>

<style>
.account-container {
  background: #000000;
  color: #FFFFFF;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 600px;
  margin: 2rem auto;
  border: 3px solid #FFFFFF;
}

.account-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.account-details {
  background: #000000;
  border: 1px solid #FFFFFF;
  padding: 1.5rem;
  margin-bottom: 2rem;
  font-family: monospace;
  font-size: 1.1rem;
  line-height: 1.8;
}

.account-label {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-right: 0.5rem;
}

.disconnect-button {
  background: #FFFFFF;
  color: #000000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.disconnect-button:hover {
  background: #000000;
  color: #FFFFFF;
  outline: 2px solid #FFFFFF;
}

.disconnect-button:focus {
  outline: 4px solid #FFFFFF;
  outline-offset: 2px;
}
</style>

<template>
  <div class="account-container">
    <h2 class="account-title">Account</h2>

    <div class="account-details">
      <div>
        <span class="account-label">Account:</span>
        {{ address }}
      </div>
      <div>
        <span class="account-label">Chain ID:</span>
        {{ chainId }}
      </div>
      <div>
        <span class="account-label">Status:</span>
        {{ status }}
      </div>
    </div>

    <button 
      v-if="status !== 'disconnected'" 
      type="button" 
      class="disconnect-button"
      @click="disconnect()"
    >
      Disconnect
    </button>
  </div>
</template>