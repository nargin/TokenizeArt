<script setup lang="ts">
import { useAccount, useDisconnect } from '@wagmi/vue';
import Connect from './components/Connect.vue'
import Mint from './components/Mint.vue'

const { isConnected, status } = useAccount();
const { disconnect } = useDisconnect();
</script>

<template>
	<div v-if="!isConnected">
		<Connect />
	</div>
	<div v-else>
		<Mint />
		<button
			v-if="status !== 'disconnected'"
			type="button"
			@click="disconnect()"
		>
			Disconnect
		</button>
	</div>
</template>
