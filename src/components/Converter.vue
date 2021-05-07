<template>
	<div class="container">
		<div class="columns is-vcentered">
			<div class="column">
				<h3 class="is-size-3">暗号化</h3>
				<textarea
					class="textarea"
					placeholder="3C978328 1456E7A5"
					rows="20"
					v-model="encoded"
				></textarea>
			</div>
			<div class="column">
				<div class="conv-container">
					<conv-button
						@click="decode"
						icon="fa-arrow-right"
						color="is-info"
						class="mb-3"
					>
						複合化
					</conv-button>
					<conv-button @click="encode" icon="fa-arrow-left" color="is-danger">
						暗号化
					</conv-button>
				</div>
			</div>
			<div class="column">
				<h3 class="is-size-3">複合化</h3>
				<textarea
					class="textarea"
					placeholder="00000000 00000000"
					rows="20"
					v-model="decoded"
				></textarea>
			</div>
			<div class="column">
				<div class="conv-container">
					<conv-button
						@click="convertToPnach"
						icon="fa-arrow-right"
						color="is-primary"
						class="mb-3"
					>
						変換
					</conv-button>
					<conv-button
						@click="deconvertFromPnach"
						icon="fa-arrow-left"
						color="is-primary"
						class="mb-3"
					>
						逆変換
					</conv-button>
					<conv-button
						@click="copyPnach"
						icon="fa-paperclip"
						color="is-primary"
					>
						pnach<br />をコピー
					</conv-button>
				</div>
			</div>
			<div class="column">
				<h3 class="is-size-3">pnach</h3>
				<textarea
					class="textarea"
					placeholder="patch=1,EE,00000000,byte,00"
					rows="20"
					v-model="pnach"
				></textarea>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useToast } from "vue-toastification"
import ConvButton from "./ConvButton.vue"

const toast = useToast()

export default defineComponent({
	name: "Converter",
	components: {
		ConvButton
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
			this.convertToPnach()
			toast.success("複合化しました。")
		},
		encode() {
			this.encoded = this.raw("encode", this.decoded)
			toast.success("暗号化しました。")
		},
		convertToPnach() {
			this.pnach = this.toPnach(this.decoded)
			toast.success("pnachコードに変換しました。")
		},
		deconvertFromPnach() {
			this.decoded = this.fromPnach(this.pnach)
			toast.success("pnachコードから復元しました。")
		},
		copyPnach() {
			navigator.clipboard.writeText(this.pnach)
			toast.success("pnachコードをコピーしました。")
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
				binary = binary.trim()

				if (!(binary === "")) {
					if (binary.match(/^([0-9A-F]{8})[\s　]*?([0-9A-F]{8})(.*)$/i)) {
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
				}

				result += "\n"
			})

			return result.trim()
		},
		toPnach(input: string): string {
			let result: string = ""

			input.split("\n").forEach(binary => {
				binary = binary.trim()

				if (!(binary === "")) {
					if (binary.match(/^\/\/.*$/)) {
						result += binary
					} else {
						binary.match(/^([0-9A-F]{8})[\s　]*?([0-9A-F]{8})(.*)$/i)
						result += "patch=1,EE,"

						switch (RegExp.$1.charAt(0)) {
							case "0":
								result += `${RegExp.$1},byte,${RegExp.$2.substring(6, 8)}`
								break
							case "1":
								result += `${RegExp.$1.substring(
									1
								)},short,${RegExp.$2.substring(4, 8)}`
								break
							case "2":
								result += `${RegExp.$1.substring(1, 8)},word,${RegExp.$2}`
								break
							case "A":
								result += `${RegExp.$1.substring(1, 8)},word,${RegExp.$2}`
								break
							case "F":
								result += `${RegExp.$1.substring(1, 8)},word,${RegExp.$2}`
								break
							default:
								result += `${RegExp.$1},extended,${RegExp.$2}`
						}

						result += RegExp.$3
					}
				}

				result += "\n"
			})

			return result.trim()
		},
		fromPnach(input: string): string {
			let result: string = ""

			input.split("\n").forEach(binary => {
				binary = binary.trim()

				if (!(binary === "")) {
					if (binary.match(/^\/\/.*$/)) {
						result += binary
					} else {
						binary.match(
							/^(\bpatch=[01],EE,\b)([0-9A-F]{7,8}),(\bbyte|short|word|extended\b),([0-9A-F]{8})(.*)$/i
						) ?? ""

						switch (RegExp.$3) {
							case "byte":
								result += `0${RegExp.$2} 000000${RegExp.$4}`
								break
							case "short":
								result += `1${RegExp.$2} 0000${RegExp.$4}`
								break
							case "word":
								result += `2${RegExp.$2} ${RegExp.$4}`
								break
							case "extended":
								result += `${RegExp.$2} ${RegExp.$4}`
								break
						}

						result += RegExp.$5
					}
				}

				result += "\n"
			})

			return result.trim()
		}
	}
})
</script>

<style lang="scss" scoped>
.conv-container {
	width: 128px;
	margin: auto;
}
</style>
