module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/ps2par/" : "/",
	pwa: {
		name: "PS2PAR変換",
		iconPaths: {
			favicon32: "favicon.svg",
			favicon16: null,
			appleTouchIcon: "favicon.svg",
			maskIcon: "favicon.svg",
			msTileImage: "favicon.svg"
		}
	}
}
