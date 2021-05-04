<template>
	<footer class="footer has-text-centered">
		<small class="is-size-6">
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
