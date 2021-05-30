<template>
	<div class="container-fluid">
		<div class="row row-align-items-start">
			<div class="col">
				<conv-input
					name="暗号化"
					placeholder="3C978328 1456E7A5"
					v-model="encoded"
				/>
			</div>
			<div class="col-xl-2 col-12 d-flex flex-column justify-content-center">
				<conv-button @click="decode" icon="arrow-right" color="blue">
					複合化
				</conv-button>
				<conv-button @click="encode" icon="arrow-left" color="red">
					暗号化
				</conv-button>
			</div>
			<div class="col">
				<conv-input
					name="複合化"
					placeholder="00000000 00000000"
					v-model="decoded"
				/>
			</div>
			<div class="col-xl-2 col-12 d-flex flex-column justify-content-center">
				<conv-button @click="convertToPnach" icon="arrow-right" color="green">
					変換
				</conv-button>
				<conv-button
					@click="deconvertFromPnach"
					icon="arrow-left"
					color="green"
				>
					逆変換
				</conv-button>
				<conv-button @click="copyPnach" icon="copy">
					pnachをコピー
				</conv-button>
			</div>
			<div class="col">
				<conv-input
					name="pnach"
					placeholder="patch=1,EE,00000000,byte,00"
					v-model="pnach"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useToast } from "vue-toastification"
import ConvInput from "./ConvInput.vue"
import ConvButton from "./ConvButton.vue"
import { Convert } from "../scripts/Convert"

const toast = useToast()

export default defineComponent({
	name: "Converter",
	components: {
		ConvInput,
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
			this.decoded = Convert.decode(this.encoded)
			this.convertToPnach()
			toast.success("複合化しました。")
		},
		encode() {
			this.encoded = Convert.encode(this.decoded)
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
