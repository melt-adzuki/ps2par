const Converter = {
	decode: generateConverter(/^([0-9A-F]{8})[\s　]*?([0-9A-F]{8})(.*)$/i, add => {
		add(`${parConverter(RegExp.$1, "address", "decode")} ${parConverter(
			RegExp.$2,
			"data",
			"decode"
		)}`.toUpperCase())
	}),

	encode: generateConverter(/^([0-9A-F]{8})[\s　]*?([0-9A-F]{8})(.*)$/i, add => {
		add(`${parConverter(RegExp.$1, "address", "encode")} ${parConverter(
			RegExp.$2,
			"data",
			"encode"
		)}`.toUpperCase())
	}),

	toPnach: generateConverter(/^([0-9A-F]{8})[\s　]*?([0-9A-F]{8})(.*)$/i, add => {
		add("patch=1,EE,")

		switch (RegExp.$1.charAt(0)) {
			case "0":
				add(`${RegExp.$1},byte,${RegExp.$2.substring(6, 8)}`)
				break
			case "1":
				add(`${RegExp.$1.substring(1)},short,${RegExp.$2.substring(4,8)}`)
				break
			case "2":
			case "A":
			case "F":
				add(`${RegExp.$1.substring(1, 8)},word,${RegExp.$2}`)
				break
			default:
				add(`${RegExp.$1},extended,${RegExp.$2}`)
				break
		}
	}),

	fromPnach: generateConverter(
		/^(\bpatch=[01],EE,\b)([0-9A-F]{1,8}),(\bbyte|short|word|extended\b),([0-9A-F]{1,8})(.*)$/i,
		add => {
			const address = RegExp.$2.padStart(8, "0")
			const value = RegExp.$4.padStart(8, "0")
			
			add(`${address} ${value}`)
		},
		5
	),
}

export default Converter

function generateConverter(
	match: RegExp,
	generator: (add: (code: string) => void) => void,
	commentOrder: number = 3
) {
	return function execute(input: string): string {
		let result = ""

		input.split("\n").forEach(line => {
			// 毎行ごとに前後空白を処理する
			line = line.trim()

			// 空白行ではない場合
			if (!(line === "")) {
				// 正しいコードである場合
				if (line.match(match)) {
					// 処理を実行する
					generator(code => {
						result += code
					})

					const comment: string = Reflect.get(RegExp, `$${commentOrder}`)

					// コードの後にコメントがある場合
					if (!(comment === "")) {
						// すでにコメントアウトされている場合
						if (comment.match(/^\s*\/\/.*$/)) {
							// そのまま出力
							result += comment
						} else {
							comment.match(/(\s*)([^\s].*)$/)
							result += `${RegExp.$1} //${RegExp.$2}`
						}
					}

					// コードではない場合
				} else {
					// すでにコメントアウトしていなければ行う
					if (!line.match(/^\s*\/\/.*$/)) result += " //"
					result += line
				}
			}

			// 改行
			result += "\n"
		})

		return result.trim()
	}
}

function parConverter(
	input: string,
	part: "address" | "data",
	mode: "encode" | "decode"
): string {
	const bxor =
		part === "address" ? [0xa6, 0x96, 0x01, 0x82] : [0xd9, 0x3b, 0x1b, 0xcc]
	let result: string = ""
	let b1 = 0
	let b2 = 0

	for (let i = 0; i < 4; i++) {
		b1 = parseInt(input.slice(i * 2, i * 2 + 2), 16)

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
