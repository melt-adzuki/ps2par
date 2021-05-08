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
import { Convert } from "../scripts/Convert"

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
			this.decoded = Convert.raw("decode", this.encoded)
			this.convertToPnach()
			toast.success("複合化しました。")
		},
		encode() {
			this.encoded = Convert.raw("encode", this.decoded)
			toast.success("暗号化しました。")
		},
		convertToPnach() {
			this.pnach = Convert.toPnach(this.decoded)
			toast.success("pnachコードに変換しました。")
		},
		deconvertFromPnach() {
			this.decoded = Convert.fromPnach(this.pnach)
			toast.success("pnachコードから復元しました。")
		},
		copyPnach() {
			navigator.clipboard.writeText(this.pnach)
			toast.success("pnachコードをコピーしました。")
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
