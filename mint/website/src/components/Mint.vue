<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWriteContract, useAccount } from '@wagmi/vue'
import { parseAbi } from 'viem'

const contractAbi = parseAbi([
  'function mint(string memory svg, string memory name, string memory description, string[] memory traitTypes, string[] memory traitValues) public',
  'function tokenURI(uint256 tokenId) public view returns (string memory)',
  'function balanceOf(address owner) public view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)'
])

const loading = ref(false)
const mintError = ref('')
const { address } = useAccount()

// Form data
const nftName = ref('')
const nftDescription = ref('')
const svgData = ref('')
const traitTypes = ref<string[]>([])
const traitValues = ref<string[]>([])

const commonSvg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27" height="27" xml:space="preserve" version="1.1" viewBox="0 0 27 27"><image width="27" height="27" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAIAAAACtmMCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAdKSURBVEhLVVZ7bFPXGb9P3+u387RjbIckxMujSUgpYTTQDQgMhY3SQpuQiNFq2qb1NYnSDE2NEA0aLKCKwf4ZGiMUBXXVaFOQRkRbtgaF0CY8k5CXHeIkTmzHdvy419e+j3N3rh1N9GfLPt95/M7vfOd+33fR3Tv3Ic8AQzEUQZWWnLafAUAkSZZWjB8AroBLUDm9RGHMe++P6YE0QPr7f4jJlQYEXJAm5MS0KXLKb3q+jMgpMQWt1NWLhNKLIF+07jDqjRiGK5utaMzsmG6vQIZQ/n/Ql94IgFgsuqXzEpyQZhQRiyU/aTAgemOS1KfCLG0wyJiE4nAUJVSkOOtSWDAkmaJJtYCigE9IqEoiDaZUUkBlPhvDtWEKYSG1RABJOYk3xtAmM21yoKmErmgNiqLr95dpCytkID06d4YJsvathbws5qx/RVdomL3+5WRvhM7JQyGRXRObdodTCSnBlckKIybwKQRISUEk9dnUmudpa4npR6Vr237t/ebGv3dtfnyyY6Hvv5LA5a8xs4HI3UPtI385TejQ9R9+oG/Ybdx7gJl05dVU0yZTSoRHFwAAmAQ1AoFEcQGQxkLHq+/u23jgpcDf3vdNjCKIqf5tm1qnJincuc1RsaMEnob1xN2X+4c/+kOy79PiDWXAlJ1YDuJGNYrDR4GXRB7DCRzOQ0lVbpFNS/L+mQufN2xWO3jH/nW2F51kcSGSQp1NOwPqilyzs7b9eWaKR7Gsmt/VLg3cfvzO66Vv7NPoTdx8BBGVSxOTDEaSJJKEV0oQNCFH7nJ+P4ERU92jCV70PVlMLIuoIM6W18UD8YklZnksReYTuhJNxeYaKCg86WZu91BGrW6VRcYIlhEQwGMUrVY0YoRKj+N8n0Yv5lTmqI3qwJURURS5BIYIonjy8oMh73O1RjYoC3zc+VohxmOYCjNVmZDwtO2FKvuGKoLWQB6a1mIkRXFJ+OG2v1iEBNWGUi25dbumeTdIwueCmL3jN7++LTH5SPj4H4O+fDHJk3ZKYwMj/r6CLVaVUSUJqfkbn+XbrQSt5lkW6sMgsQKAuPq+f9jz8M65Jyb/Q/WTfpHjEBUVd4WSr72s31Qiorg0eEktCg2Hd9GqghQLyCKr7ytfYDgYmhxSiykS10MalYrCYFDwPI8hsnvcTVEUv8y7vnbdu3SfUpMwxL0jLjwRMVSZsjbkzf19Dnq2stx+a2Zu+gk3d/6+vrLA0VgABNkzNAgDCiREkqAUjfAhUmNSYMIjpaTo04jlZ0WWtat4kPxF+2YEFyJ/OqdSJaMPgkyEaeza+0mvCw8YAh8/xjUGQ2Xh9L/m/KORwLgbA0CWAAahRCrMKkDkeYnU0PEwEx2IOH9SuO10w+R3U4ggJAE+eOI735h3x+mf+rwg3v0w2P4FJqQA4Lxf3sdJHF4HlWUASBJyoiikhCJ5REQRo9MuJQQ6iy5Yq4v4osFF3ryzWGtWFZTpTE6zbX3hV4fvDL7zz+iYFyNpUxGB2bIlVEplG0zZOFZSxrEcLypJCUPT2QQmguKtdQiQhbgQnomJSWGobWBxYK606bmRq8OxhdjCiD84t+j3+ELziyHvIvrzLeyEJ7Ecjd4b8U8tPPjzCXZxmltehJlIkSgILKZSGcprEJhrKNL32J9XnU3Q+NPzT+d7Z00GNY2pcRVudzg4joP5at26dYuXB5NLy7//1W8mxscZhvn21q1yZ8nMt58oGtMKEZDiA2Me8459JI3INHX/sou0kGsacpb+M2vSGwlUiMwG2j9sj0ajmfl4xNPU1HTq1KmjR48eOHiwrq7uSnc3z4TgfgqjEj04PnLlZsOxQ+G5GB9LoECKTIcXRgIoIcZZbnkpUl5e1trS0tnZmWGM+9nKykq43uPxfH71an9/f0lJiSxL0Vh0RSOK4yarff7W0Aff93CROBuK4rgcdgUSy3E2yiSi7LFjH128eNHtdmfmQ3R1dV27dm1yakqn1VZXV/f09MgA3L03oDBKPI9IYmxhbmkmxsSz3xof1eWuYpZiqxuLgY6MhRjouMbGxuPHj2e4Mghy3HsnT4RCobNnz7Is+/7hwzilYxIM0rr34KZD56l8a25F7epdTc6X397Y1tn62TfNXd25RdYsaw6lVff29sIDPov6+vqs6k2Qt62tDTq3uqYGnhJmG0ueBW3d+8sZR/3wpx24Vk/pjCSZI2dpYUHSAokuMjpbWr5+6908CShJD0EaGhrOnDnT3Nx8/fr1RIJ78803Lly40NHRcfPmTZvNBn2iJrVQ44ENv/2rOd+cY3NApRrraq2lQGuxaswFGrNdk29XGa2qLJvWWooR5JEjR6DAlpYWyL5nzx6Y7jKSM6ipqdn20na05dVWd95GxTGCAAulpNR5xYLeVfoybRgMQPYN3wi6+9N2GjDHZIrtM6iqWIvuf2U/SA8AWMtl5X1CMWDPSuWGbwoAGplanSGZcI+Njj96ofbHjlVFPr93YOi2MpYBgvwP0lm6MEQsKQcAAAAASUVORK5CYII="/></svg>'
const rareSvg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34" height="34" xml:space="preserve" version="1.1" viewBox="0 0 34 34"><image width="34" height="34" xlink:href="data:image/png;base64,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"/></svg>'

const { data: hash, writeContract } = useWriteContract()

const CONTRACT_ADDRESS = '0xE056f17394D7526a2fB2A97164c0D666fa124f79' // Update with your contract address

const handleMint = async () => {
  try {
    loading.value = true
    mintError.value = ''

    if (!address.value) throw new Error('Wallet not connected')

	loadAnSVG();

    // Call the updated mint function with traitTypes and traitValues
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: 'mint',
      args: [svgData.value, nftName.value, nftDescription.value, traitTypes.value, traitValues.value]
    })

  } catch (err: any) {
    mintError.value = err.message || 'Error minting NFT'
  } finally {
    loading.value = false
  }
}

const loadCommonSVG = () => {
  svgData.value = commonSvg
  nftName.value = 'Normal'
  nftDescription.value = 'Veigar 42 stacks'
  traitTypes.value = ['Stack', 'AP', 'Rarity']
  traitValues.value = ['42', Math.floor(Math.random() * 100).toString(), 'Common']
}

const loadRareSVG = () => {
  svgData.value = rareSvg
  nftName.value = 'Golden'
  nftDescription.value = 'Veigar 42 stacks'
  traitTypes.value = ['Stack', 'AP', 'Rarity']
  traitValues.value = ['42', Math.floor(Math.random() * 100).toString(), 'Rare']
}

const loadAnSVG = () => {
	const randomNumber = Math.floor(Math.random() * 100);
	if (randomNumber === 1) {
		loadRareSVG();
	} else {
		loadCommonSVG();
	}
}

const metadata = computed(() => {
  const traits = traitTypes.value.map((type, index) => ({
    trait_type: type,
    value: traitValues.value[index]
  }));

  return JSON.stringify({
    name: nftName.value,
    description: nftDescription.value,
    image: svgData.value,
    attributes: traits
  }, null, 2);
});
</script>

<template>
  <div class="app-container">
    <div class="mint-container">
      <h2 class="title">Create Your NFT</h2>
      
		<div>wallet: {{ address }}</div>

      <form @submit.prevent="handleMint">
        <div class="button-group">
          <button 
            type="button"
            class="button secondary"
            @click="loadAnSVG"
            :disabled="loading"
          >
            Load Sample
          </button>

          <button 
            type="submit" 
            class="button primary"
            :disabled="loading"
          >
            {{ loading ? 'Minting...' : 'Mint NFT' }}
          </button>
        </div>
      </form>

      <div v-if="hash" class="status-message success">
        Transaction hash: {{ hash }}
      </div>

      <div v-if="mintError" class="status-message error">
        {{ mintError }}
      </div>

      <!-- SVG Preview -->
      <div v-if="svgData" class="preview-section">
        <h3 class="section-title">Preview</h3>
        <div class="svg-preview" v-html="svgData"></div>
		<div class="metadata-preview">
          <p>Metadata:</p>
          <pre>{{ metadata }}</pre>
          </div>
        </div>
    </div>
  </div>
</template>