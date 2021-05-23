<template>
	<footer class="py-3">
		<small class="d-block h6 m-0 text-center">
			{{ currentYear }} Published by hijiki02 | Source code is available on
			GitHub
		</small>
	</footer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
	setup() {
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
