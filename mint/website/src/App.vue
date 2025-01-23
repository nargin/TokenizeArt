<script setup lang="ts">
import { useAccount } from '@wagmi/vue';
import Account from './components/Account.vue'
import Connect from './components/Connect.vue'
import Mint from './components/Mint.vue'

const { isConnected } = useAccount()
</script>

<template>
  <div class="flex-row-center">
    <Account v-if="isConnected"/>
    <Connect v-else />
    <Mint v-if="isConnected"/>
  </div>
</template>

<style scoped>
.flex-row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  gap: 0.2rem; /* Equivalent to space-x-4 in Tailwind */
}
</style>