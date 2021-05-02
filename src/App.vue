<template>
	<header class="hero is-primary">
		<div class="hero-body">
			<p class="title">PS2PAR変換</p>
			<p class="subtitle">
				PS2PARコードを暗号化・複合化したり、PCSX2で使用できるpnachコードに変換したりすることができます。
			</p>
		</div>
	</header>
	<section class="section">
		<converter />
	</section>
	<base-footer />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Converter from "./components/Converter.vue"
import BaseFooter from "./components/BaseFooter.vue"

export default defineComponent({
	name: "App",
	components: {
		Converter,
		BaseFooter
	}
})
</script>
