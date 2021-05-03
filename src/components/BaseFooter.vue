<template>
	<footer class="footer">
		<small class="content has-text-centered is-size-6">
			<p>
				{{ currentYear }} Published by hijiki02 | Source code is available on
				GitHub
			</p>
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
