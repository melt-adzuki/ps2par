export const Convert = {
	num(
		input: string,
		part: "address" | "data",
		mode: "encode" | "decode"
	): string {
		const bxor =
			part === "address" ? [0xa6, 0x96, 0x01, 0x82] : [0xd9, 0x3b, 0x1b, 0xcc]
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
					result += `${this.num(RegExp.$1, "address", mode)} ${this.num(
						RegExp.$2,
						"data",
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
	pnach(mode: "convert" | "deconvert", input: string): string {
		let result: string = ""

		input.split("\n").forEach(binary => {
			binary = binary.trim()

			if (!(binary === "")) {
				if (binary.match(/^\/\/.*$/) || "\n") {
					result += binary
				} else if (binary.match(/^([89BF])/i)) {
					result += `//${binary}`
				} else {
					switch (mode) {
						case "convert":
							if (binary.match(/^([0-9A-F]{8})[\s　]*?([0-9A-F]{8})(.*)$/i)) {
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
							} else {
								result += `//${binary}`
							}

							result += RegExp.$3

						case "deconvert":
							if (
								binary.match(
									/^(\bpatch=[01],EE,\b)([0-9A-F]{7,8}),(\bbyte|short|word|extended\b),([0-9A-F]{2,8})(.*)$/i
								)
							) {
								const cutAddress =
									RegExp.$2.length === 8 ? RegExp.$2.substring(1, 8) : RegExp.$2

								switch (RegExp.$3) {
									case "byte":
										result += `0${cutAddress} 000000${RegExp.$4}`
										break
									case "short":
										result += `1${cutAddress} 0000${RegExp.$4}`
										break
									case "word":
										result += `2${cutAddress} ${RegExp.$4}`
										break
									case "extended":
										result += `${RegExp.$2} ${RegExp.$4}`
										break
								}

								if (RegExp.$5 != "") {
									const comment = RegExp.$5

									comment.match(/(\s*)([^\s].*)$/)
									result += `${RegExp.$1}//${RegExp.$2}`
								}
							} else {
								result += `//${binary}`
							}
					}
				}
			}

			result += "\n"
		})

		return result.trim()
	}
}
