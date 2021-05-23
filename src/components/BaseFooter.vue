<template>
	<footer class="py-3 bg-dark">
		<small class="d-block h6 m-0 text-center text-white">
			{{ currentYear }} Published by hijiki02 | Source code is available on
			GitHub
		</small>
	</footer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
	setup(props) {
		const currentYear = ref(0)

		return {
			currentYear
		}
	},
	created() {
		const dateObject = new Date()
		this.currentYear = dateObject.getFullYear()
	}
})
</script>

<style lang="scss" scoped>
.footer {
	padding: 1.5rem;
}
</style>
