<template>
	<header class="container text-center">
		<h1 class="pb-5">
			<logo />
		</h1>
		<h2 class="h5 text-black-50 font-weight-normal">
			PS2PARコードを暗号化・複合化したり、PCSX2で使用できるpnachコードに変換したりできます。
		</h2>
	</header>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Logo from "./Logo.vue"

export default defineComponent({
	components: {
		Logo
	}
})
</script>
