<template>
	<!-- <img alt="Vue logo" src="./assets/logo.png" />
	<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->

	<section class="hero is-primary">
		<div class="hero-body">
			<p class="title">PS2PAR変換</p>
			<p class="subtitle">
				PS2PARコードを暗号化・複合化したり、PCSX2で使用できるpnachコードに変換したりすることができます。
			</p>
		</div>
	</section>

	<div class="columns">
		<div class="column">
			<div class="block">
				<p class="is-size-2">暗号化</p>
				<textarea
					class="textarea"
					placeholder="10 lines of textarea"
					rows="15"
					v-model="encoded"
				></textarea>
			</div>
		</div>
		<div class="column">
			<div class="block">
				<button
					@click="decode"
					class="button is-primary is-rounded is-fullwidth"
				>
					複合化
				</button>
				<button
					@click="encode"
					class="button is-primary is-rounded is-fullwidth"
				>
					暗号化
				</button>
			</div>
		</div>
		<div class="column">
			<div class="block">
				<p class="is-size-2">複合化</p>
				<textarea
					class="textarea"
					placeholder="10 lines of textarea"
					rows="15"
					v-model="decoded"
				></textarea>
			</div>
		</div>
		<div class="column">
			<div class="block">
				<button
					@click="convertToPnach"
					class="button is-primary is-rounded is-fullwidth"
				>
					変換
				</button>
			</div>
		</div>
		<div class="column">
			<div class="block">
				<p class="is-size-2">pnach</p>
				<textarea
					class="textarea"
					placeholder="10 lines of textarea"
					rows="15"
					v-model="pnach"
				></textarea>
			</div>
		</div>
	</div>

	<footer class="footer">
		<div class="content">
			<p class="is-size-3">参考</p>
			<p>こちらのサイトを参考に作らせていただきました。</p>
			<a href="https://ps2par-pnach.blogspot.com/"
				>PS2PARコード→pnach用コード変換スクリプト</a
			>
			<a href="http://www.big.or.jp/~dram/ps2code.html"
				>PS2PARコード変換スクリプト</a
			>
		</div>
	</footer>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import HelloWorld from "./components/HelloWorld.vue"

export default defineComponent({
	name: "App",
	components: {
		HelloWorld
	},
	data() {
		return {
			encoded: "",
			decoded: "",
			pnach: ""
		}
	},
	methods: {
		decode() {
			this.decoded = this.raw("decode", this.encoded)
		},
		encode() {
			this.encoded = this.raw("encode", this.decoded)
		},
		convertToPnach() {
			this.pnach = this.toPnach(this.decoded)
		},
		num(input: string, isDt: boolean, mode: "encode" | "decode"): string {
			const bxor = isDt ? [0xa6, 0x96, 0x01, 0x82] : [0xd9, 0x3b, 0x1b, 0xcc]
			let result: string = ""
			let b1,
				b2 = 0

			for (let i = 0; i < 4; i++) {
				b1 = parseInt(input.substr(i * 2, 2), 16)

				switch (mode) {
					case "encode":
						b2 = b1 ^ bxor[i]
						b2 += bxor[(i + 1) & 3]
						b2 &= 0xff
						break

					case "decode":
						b1 += 256 - bxor[(i + 1) & 3]
						b1 &= 0xff
						b2 = b1 ^ bxor[i]
						break
				}

				if (b2.toString(16).length === 1) result += "0"
				result += b2.toString(16)
			}

			return result
		},
		raw(mode: "encode" | "decode", input: string): string {
			let result: string = ""

			input.split("\n").forEach(binary => {
				if (binary.match(/^([0-9A-F]{8})[ \t]([0-9A-F]{8})(.*)$/i)) {
					result += `${this.num(RegExp.$1, true, mode)} ${this.num(
						RegExp.$2,
						false,
						mode
					)}`.toUpperCase()

					if (RegExp.$3 != "") {
						const comment = RegExp.$3

						if (comment.match(/^\s*\/\/.*$/)) {
							result += comment
						} else {
							comment.match(/(\s*)([^\s].*)$/)
							result += `${RegExp.$1}//${RegExp.$2}`
						}
					}
				} else {
					if (!binary.match(/^\s*\/\/.*$/)) result += "//"
					result += binary
				}

				result += "\n"
			})

			return result.trim()
		},
		toPnach(input: string): string {
			let result: string = ""

			input.split("\n").forEach(binary => {
				if (binary.match(/^\/\/.*$/)) {
					result += binary
				} else {
					binary.match(/^([0-9A-F]{8})[ \t]([0-9A-F]{8})(.*)$/i)
					result += "patch=1,EE,"

					//let type: "byte" | "short" | "word" | "extended"

					switch (RegExp.$1.charAt(0)) {
						case "0":
							result += `${RegExp.$1},byte,${RegExp.$2.substring(6, 8)}`
							break
						case "1":
							result += `${RegExp.$1.substring(1)},short,${RegExp.$2.substring(
								4,
								8
							)}`
							break
						case "2" || "A" || "F":
							result += `${RegExp.$1.substring(1, 8)},word,${RegExp.$2}`
							break
						default:
							result += `${RegExp.$1},extended,${RegExp.$2}`
					}

					result += RegExp.$3
				}

				result += "\n"
			})

			return result.trim()
		}
	}
})
</script>
