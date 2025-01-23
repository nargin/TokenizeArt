<script setup lang="ts">
import { useChainId, useConnect } from '@wagmi/vue'

const chainId = useChainId()
const { connect, connectors, error, status } = useConnect()
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
</style>

<template>
  <div class="connect-container">
    <h2 class="connect-title">Connect</h2>

    <div>
      <button 
        v-for="connector in connectors" 
        :key="connector.id" 
        type="button" 
        class="connect-button"
        @click="connect({ connector, chainId })"
      >
        {{ connector.name }}
      </button>
    </div>

    <div class="status-container">
      <div>Status: {{ status }}</div>
      <div v-if="error?.message" class="error-message">
        {{ error.message }}
      </div>
    </div>
  </div>
</template>