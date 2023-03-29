const Converter = {
	decode: generateConverter(/^(?<address>[0-9A-F]{8})[\s　]*?(?<value>[0-9A-F]{8})(?<rest>.*)$/i, (matched, add) => {
		const address = parConverter(matched.address, "address", "decode")
		const value = parConverter(matched.value, "value", "decode")

		add(`${address} ${value}`)
	}),

	encode: generateConverter(/^(?<address>[0-9A-F]{8})[\s　]*?(?<value>[0-9A-F]{8})(?<rest>.*)$/i, (matched, add) => {
		const address = parConverter(matched.address, "address", "encode")
		const value = parConverter(matched.value, "value", "encode")

		add(`${address} ${value}`)
	}),

	toPnach: generateConverter(/^(?<address>[0-9A-F]{8})[\s　]*?(?<value>[0-9A-F]{8})(?<rest>.*)$/i, (matched, add) => {
		add("patch=1,EE,")

		switch (matched.address.charAt(0)) {
			case "0":
				add(`${matched.address},byte,${matched.value.substring(6, 8)}`)
				break
			case "1":
				add(`${matched.address.substring(1)},short,${matched.value.substring(4,8)}`)
				break
			case "2":
			case "A":
			case "F":
				add(`${matched.address.substring(1, 8)},word,${matched.value}`)
				break
			default:
				add(`${matched.address},extended,${matched.value}`)
				break
		}
	}),

	fromPnach: generateConverter(
		/^(\bpatch=[01],EE,\b)(?<address>[0-9A-F]{1,8}),(\bbyte|short|word|extended\b),(?<value>[0-9A-F]{1,8})(?<rest>.*)$/i,
		(matched, add) => {
			const address = matched.address.padStart(8, "0")
			const value = matched.value.padStart(8, "0")
			
			add(`${address} ${value}`)
		},
	),
}

export default Converter

function generateConverter(
	matcher: RegExp,
	generator: (matched: Record<string, string>, add: (code: string) => void) => void,
) {
	return function execute(input: string): string {
		let result = ""

		input.split("\n").forEach(line => {
			// 毎行ごとに前後空白を処理する
			line = line.trim()

			// 空白行ではない場合
			if (line !== "") {
				const matchArray = line.match(matcher)
				
				// 正しいコードである場合
				if (matchArray !== null) {
					// 処理を実行する
					generator(matchArray.groups!, code => {
						result += code
					})

					const comment = matchArray.groups!.rest

					// コードの後にコメントがある場合
					if (!(comment === "")) {
						// すでにコメントアウトされている場合
						if (comment.match(/^\s*\/\/.*$/)) {
							// そのまま出力
							result += comment
						} else {
							const matchArray = comment.match(/(\s*)([^\s].*)$/)
							result += `${matchArray![1]} // ${matchArray![2]}`
						}
					}

					// コードではない場合
				} else {
					// すでにコメントアウトしていなければ行う
					if (!line.match(/^\s*\/\/.*$/)) result += "// "
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
	part: "address" | "value",
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

	return result.toUpperCase()
}
