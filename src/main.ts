import { createApp } from "vue"
import App from "./App.vue"
import "./main.scss"
import VueToastification, { TYPE } from "vue-toastification"
import "vue-toastification/dist/index.css"

const app = createApp(App)

app.use(VueToastification, {
	toastDefaults: {
		[TYPE.SUCCESS]: {
			position: "top-center",
			timeout: 5000,
			closeOnClick: true,
			pauseOnFocusLoss: false,
			pauseOnHover: false,
			draggable: true,
			draggablePercent: 0.6,
			showCloseButtonOnHover: false,
			hideProgressBar: true,
			closeButton: "button",
			icon: true,
			rtl: false
		}
	},
	transition: "Vue-Toastification__slideBlurred",
	maxToasts: 3,
	newestOnTop: true
})

app.mount("#app")
