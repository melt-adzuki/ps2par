<template>
	<base-header />
	<main>
		<article class="section has-bg-image">
			<converter />
		</article>
		<aside class="section has-background-white-bis">
			<div class="container">
				<h2 class="is-size-3">謝辞</h2>
				<p>
					恐縮ながらこちらのサイトを参考に制作させていただきました。ありがとうございました。
				</p>
				<ul>
					<li>
						<a href="https://ps2par-pnach.blogspot.com/"
							>PS2PARコード→pnach用コード変換スクリプト</a
						>
					</li>
					<li>
						<a href="http://www.big.or.jp/~dram/ps2code.html"
							>PS2PARコード変換スクリプト - zero memory</a
						>
					</li>
				</ul>
			</div>
		</aside>
	</main>
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
	background-image: url(~@/assets/layered-waves-haikei.svg);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: bottom;
}
</style>
