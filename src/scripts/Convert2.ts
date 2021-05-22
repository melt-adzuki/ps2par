class Code {
	match: RegExp
	func: Function
	commentOrder: number
	result: string = ""

	constructor(match: RegExp, func: Function, commentOrder: number = 3) {
		this.match = match
		this.func = func
		this.commentOrder = commentOrder
	}

	do(input: string): string {
		this.result = ""

		input.split("\n").forEach(line => {
			// 毎行ごとに前後空白を処理する
			line = line.trim()

			// 空白行ではない場合
			if (!(line === "")) {
				// 正しいコードである場合
				if (line.match(this.match)) {
					// 処理を実行する
					this.func()

					let comment: string = ""

					switch (this.commentOrder) {
						case 3:
							comment = RegExp.$3
							break
						case 5:
							comment = RegExp.$5
					}

					// コードの後にコメントがある場合
					if (!(comment === "")) {
						// すでにコメントアウトされている場合
						if (comment.match(/^\s*\/\/.*$/)) {
							// そのまま出力
							this.result += comment
						} else {
							comment.match(/(\s*)([^\s].*)$/)
							this.result += `${RegExp.$1}//${RegExp.$2}`
						}
					}

					// コードではない場合
				} else {
					// すでにコメントアウトしていなければ行う
					if (!line.match(/^\s*\/\/.*$/)) this.result += "//"
					this.result += line
				}
			}

			// 改行
			this.result += "\n"
		})

		return this.result.trim()
	}
}

const num = (
	input: string,
	part: "address" | "data",
	mode: "encode" | "decode"
): string => {
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
}

const decode = new Code(/^([0-9A-F]{8})[\s　]*?([0-9A-F]{8})(.*)$/i, () => {
	decode.result += `${num(RegExp.$1, "address", "decode")} ${num(
		RegExp.$2,
		"data",
		"decode"
	)}`.toUpperCase()
})

const encode = new Code(/^([0-9A-F]{8})[\s　]*?([0-9A-F]{8})(.*)$/i, () => {
	encode.result += `${num(RegExp.$1, "address", "encode")} ${num(
		RegExp.$2,
		"data",
		"encode"
	)}`.toUpperCase()
})

const toPnach = new Code(/^([0-9A-F]{8})[\s　]*?([0-9A-F]{8})(.*)$/i, () => {
	toPnach.result += "patch=1,EE,"

	switch (RegExp.$1.charAt(0)) {
		case "0":
			toPnach.result += `${RegExp.$1},byte,${RegExp.$2.substring(6, 8)}`
			break
		case "1":
			toPnach.result += `${RegExp.$1.substring(1)},short,${RegExp.$2.substring(
				4,
				8
			)}`
			break
		case "2":
			toPnach.result += `${RegExp.$1.substring(1, 8)},word,${RegExp.$2}`
			break
		case "A":
			toPnach.result += `${RegExp.$1.substring(1, 8)},word,${RegExp.$2}`
			break
		case "F":
			toPnach.result += `${RegExp.$1.substring(1, 8)},word,${RegExp.$2}`
			break
		default:
			toPnach.result += `${RegExp.$1},extended,${RegExp.$2}`
			break
	}
})

const fromPnach = new Code(
	/^(\bpatch=[01],EE,\b)([0-9A-F]{7,8}),(\bbyte|short|word|extended\b),([0-9A-F]{2,8})(.*)$/i,
	() => {
		const cutAddress =
			RegExp.$2.length === 8 ? RegExp.$2.substring(1, 8) : RegExp.$2

		switch (RegExp.$3) {
			case "byte":
				fromPnach.result += `0${cutAddress} 000000${RegExp.$4}`
				break
			case "short":
				fromPnach.result += `1${cutAddress} 0000${RegExp.$4}`
				break
			case "word":
				fromPnach.result += `2${cutAddress} ${RegExp.$4}`
				break
			case "extended":
				fromPnach.result += `${RegExp.$2} ${RegExp.$4}`
				break
		}
	},
	5
)

export const Convert = {
	decode(input: string): string {
		return decode.do(input)
	},
	encode(input: string): string {
		return encode.do(input)
	},
	toPnach(input: string): string {
		return toPnach.do(input)
	},
	fromPnach(input: string): string {
		return fromPnach.do(input)
	}
}
