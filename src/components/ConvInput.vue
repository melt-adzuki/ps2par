<template>
	<h3>{{ name }}</h3>
	<textarea
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
