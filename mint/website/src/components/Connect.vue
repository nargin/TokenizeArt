<script setup lang="ts">
import { useChainId, useConnect } from '@wagmi/vue'

const chainId = useChainId()
const { connect, connectors, error, status } = useConnect()
</script>

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