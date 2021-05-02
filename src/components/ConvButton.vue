<template>
	<button
		@click="decode"
		:class="`conv-button button ${color} is-flex-direction-column`"
	>
		<i :class="`fas fa-arrow-${direction} fa-3x`"></i>
		<span>{{ label }}</span>
	</button>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	name: "ConvButton",
	props: {
		label: String,
		direction: String,
		color: String
	}
})
</script>

<style lang="scss" scoped>
.conv-button {
	width: 128px;
	height: 128px;
}
</style>
