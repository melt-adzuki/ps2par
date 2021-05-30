<template>
	<div class="container">
		<h2>謝辞</h2>
		<div v-for="site in sites" :key="site.id">
			<h3 class="h4">{{ site.title }}</h3>
			<p v-if="site.description">{{ site.description }}</p>
			<ul>
				<li v-for="data in site.data" :key="data.id">
					<a :href="data.url" target="_blank" rel="noopener">
						{{ data.title }}
						<span v-if="data.author"> - {{ data.author }}</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	setup() {
		const sites = [
			{
				title: "参考",
				description:
					"恐縮ながら、こちらのサイトを参考に制作させていただきました。ありがとうございました。",
				data: [
					{
						author: "かぢゃぽんのお部屋",
						title: "PS2PAR解析部屋",
						url: "http://www5.airnet.ne.jp/kajapon/"
					},
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
			},
			{
				title: "サードパーティーライセンス",
				data: [
					{
						author: "Ionic",
						title: "Ionicons",
						url: "https://ionic.io/ionicons"
					},
					{
						title: "その他",
						url: "./ThirdPartyNotices.txt"
					}
				]
			}
		]

		return { sites }
	}
})
</script>
