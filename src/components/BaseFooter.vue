<template>
	<footer class="py-3">
		<small class="d-block h6 m-0 text-center">
			Published {{ currentYear }} by melt_adzuki | Source code is available on
			<a target="_blank" href="https://github.com/melt-adzuki/ps2par">GitHub</a>
		</small>
	</footer>
</template>

<script lang="ts" setup>
const date = new Date()
const currentYear = date.getFullYear()
</script>
