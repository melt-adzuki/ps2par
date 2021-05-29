<template>
	<div class="container">
		<h2>謝辞</h2>
		<p>
			恐縮ながら、こちらのサイトを参考に制作させていただきました。ありがとうございました。
		</p>
		<ul>
			<li v-for="site in sites" :key="site.id">
				<a :href="site.url" target="_blank" rel="noopener">
					{{ site.title }}
					<span v-if="site.author"> - {{ site.author }}</span>
				</a>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	setup() {
		const sites = [
			{
				author: "zero memory",
				title: "PS2PARコード変換スクリプト",
				url: "http://www.big.or.jp/~dram/ps2code.html"
			},
			{
				title: "PS2PARコード→pnach用コード変換スクリプト",
				url: "https://ps2par-pnach.blogspot.com/"
			}
		]

		return { sites }
	}
})
</script>
