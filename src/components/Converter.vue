<template>
	<div class="container-fluid">
		<div class="row row-align-items-start">
			<div class="col">
				<conv-input
					title="PAR暗号コード"
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
					title="複合コード"
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
					title="pnach"
					placeholder="patch=1,EE,00000000,byte,00"
					v-model="pnach"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useToast } from "vue-toastification"
import Converter from "../scripts/Converter"
import ConvInput from "./ConvInput.vue"
import ConvButton from "./ConvButton.vue"

const toast = useToast()

const encoded = ref("")
const decoded = ref("")
const pnach = ref("")

function decode() {
	decoded.value = Converter.decode(encoded.value)
	convertToPnach()
	toast.success("複合化しました。")
}

function encode() {
	encoded.value = Converter.encode(decoded.value)
	toast.success("暗号化しました。")
}

function convertToPnach() {
	pnach.value = Converter.toPnach(decoded.value)
	toast.success("pnachコードに変換しました。")
}

function deconvertFromPnach() {
	decoded.value = Converter.fromPnach(pnach.value)
	toast.success("pnachコードから復元しました。")
}

function copyPnach() {
	navigator.clipboard.writeText(pnach.value)
	toast.success("pnachコードをコピーしました。")
}
</script>
