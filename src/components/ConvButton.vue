<template>
	<button
		:class="
			`conv-button btn has-shadow w-100 d-flex justify-content-between align-items-center my-3 ${color}`
		"
	>
		<component :is="icon" class="conv-icon"></component>
		<span><slot></slot></span>
	</button>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import ArrowLeft from "./icons/ArrowLeft.vue"
import ArrowRight from "./icons/ArrowRight.vue"
import Copy from "./icons/Copy.vue"

export default defineComponent({
	name: "ConvButton",
	components: {
		ArrowLeft,
		ArrowRight,
		Copy
	},
	props: {
		icon: String,
		color: String
	}
})
</script>

<style lang="scss" scoped>
.conv-button {
	text-align: right;
	padding: 12px 16px;
	background-color: #ffffff;
	color: var(--main-color);
	border-radius: 8px;

	&:hover {
		background-color: var(--main-color);
		color: #ffffff;
	}
}

.conv-icon {
	height: 32px;
}
</style>
