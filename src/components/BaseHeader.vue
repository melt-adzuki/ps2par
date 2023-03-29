<template>
	<header class="container text-center">
		<h1 class="mb-5">
			<logo />
		</h1>
		<h2 class="subtitle h5 text-black-50 font-weight-normal">
			PS2PARコードを暗号化・複合化したり、PCSX2で使用できるpnachコードに変換したりできます。
		</h2>
	</header>
</template>

<script lang="ts" setup>
import Logo from "./Logo.vue"
</script>

<style lang="scss" scoped>
.subtitle {
	letter-spacing: 0.05em;
}
</style>
