<template>
	<base-header role="banner" class="py-5" />
	<main role="main">
		<article class="has-background-image px-5 py-5">
			<converter />
		</article>
		<aside role="complementary" class="py-5">
			<acknowledgements />
		</aside>
	</main>
	<base-footer role="contentinfo" />
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
	background-image: url("~@/assets/circle-scatter-haikei.svg");
	background-repeat: no-repeat;
	background-position: center;
}
</style>
