<template>
	<h3>{{ name }}</h3>
	<textarea
		class="conv-input has-shadow w-100"
		:placeholder="placeholder"
		rows="20"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	></textarea>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	props: {
		name: String,
		placeholder: String,
		modelValue: String
	}
})
</script>

<style lang="scss" scoped>
.conv-input {
	border-width: 0px;
	border-radius: 16px;
	padding: 16px;

	&:focus-visible {
		outline: none;
	}
}
</style>
