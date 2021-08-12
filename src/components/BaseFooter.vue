<template>
	<footer class="py-3">
		<small class="d-block h6 m-0 text-center">
			{{ currentYear }} Published by hijiki02 | Source code is available on
			GitHub
		</small>
	</footer>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	setup() {
		const date = new Date()
		const currentYear = date.getFullYear()

		return { currentYear }
	}
})
</script>
