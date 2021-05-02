<template>
	<base-header />
	<section class="section has-bg-image">
		<converter />
	</section>
	<base-footer />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import BaseHeader from "./components/BaseHeader.vue"
import Converter from "./components/Converter.vue"
import BaseFooter from "./components/BaseFooter.vue"

export default defineComponent({
	name: "App",
	components: {
		BaseHeader,
		Converter,
		BaseFooter
	}
})
</script>

<style lang="scss" scoped>
.has-bg-image {
	background-image: url(/img/layered-waves-haikei.svg);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: bottom;
}
</style>
