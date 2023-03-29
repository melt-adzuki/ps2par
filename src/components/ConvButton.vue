<template>
	<button
		:class="
			`conv-button btn has-shadow w-100 d-flex justify-content-between align-items-center my-3 ${color}`
		"
	>
		<arrow-left v-if="icon === 'arrow-left'" class="conv-icon" />
		<arrow-right v-else-if="icon === 'arrow-right'" class="conv-icon" />
		<copy v-else-if="icon === 'copy'" class="conv-icon" />
		
		<span><slot /></span>
	</button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue"
import ArrowLeft from "./icons/ArrowLeft.vue"
import ArrowRight from "./icons/ArrowRight.vue"
import Copy from "./icons/Copy.vue"

defineProps<{
	icon: "arrow-left" | "arrow-right" | "copy"
	color?: string
}>()
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
