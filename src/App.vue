<template>
	<base-header class="py-5" />
	<main>
		<article class="py-5 has-background-image">
			<converter />
		</article>
		<aside class="py-5">
			<acknowledgements />
		</aside>
	</main>
	<base-footer />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import BaseHeader from "./components/BaseHeader.vue"
import Converter from "./components/Converter.vue"
import Acknowledgements from "./components/Acknowledgements.vue"
import BaseFooter from "./components/BaseFooter.vue"

export default defineComponent({
	name: "App",
	components: {
		BaseHeader,
		Converter,
		Acknowledgements,
		BaseFooter
	}
})
</script>

<style lang="scss" scoped>
.has-background-image {
	background-image: url(~@/assets/layered-waves-haikei.svg);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: bottom;
}
</style>
