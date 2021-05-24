<template>
	<button
		:class="
			`conv-button btn has-shadow w-100 d-flex justify-content-between align-items-center my-3 ${color}`
		"
	>
		<i :class="`fas ${icon} fa-2x`"></i>
		<span class="ml-4"><slot></slot></span>
	</button>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	name: "ConvButton",
	props: {
		icon: String,
		color: String
	}
})
</script>

<style lang="scss" scoped>
.conv-button {
	text-align: right;
	padding: 12px 24px;
	border-radius: 0px;
	background-color: #ffffff;
	color: var(--main-color);
	border-bottom: 8px solid var(--main-color);

	&:hover {
		background-color: var(--main-color);
		color: #ffffff;
	}
}
</style>
