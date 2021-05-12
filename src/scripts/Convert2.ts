class Code {
	match: RegExp
	func: Function
	result: string = ""

	constructor(match: RegExp, func: Function) {
		this.match = match
		this.func = func
	}

	do(input: string): string {
		input.split("\n").forEach(line => {
			// 毎行ごとに前後空白を処理する
			line = line.trim()

			// 空白行ではない場合
			if (!(line === "")) {
				// 正しいコードである場合
				if (line.match(this.match)) {
					// 処理を実行する
					this.func(line)

					// コードの後にコメントがある場合
					if (!(RegExp.$3 === "")) {
						const comment = RegExp.$3

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

const decode = new Code(
	/^([0-9A-F]{8})[\s　]*?([0-9A-F]{8})(.*)$/i,
	(line: string) => {
		decode.result += `${num(RegExp.$1, "address", "decode")} ${num(
			RegExp.$2,
			"data",
			"decode"
		)}`.toUpperCase()
	}
)

const encode = new Code(
	/^([0-9A-F]{8})[\s　]*?([0-9A-F]{8})(.*)$/i,
	(line: string) => {
		encode.result += `${num(RegExp.$1, "address", "encode")} ${num(
			RegExp.$2,
			"data",
			"encode"
		)}`.toUpperCase()
	}
)

export const Convert = {
	decode(input: string): string {
		return decode.do(input)
	},
	encode(input: string): string {
		return encode.do(input)
	}
}
