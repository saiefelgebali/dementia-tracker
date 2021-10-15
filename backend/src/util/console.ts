/**
 * Map console style strings
 */
enum ConsoleStyles {
	Reset = "\x1b[0m",
	Bright = "\x1b[1m",
	Dim = "\x1b[2m",
	Underscore = "\x1b[4m",
	Blink = "\x1b[5m",
	Reverse = "\x1b[7m",
	Hidden = "\x1b[8m",

	FgBlack = "\x1b[30m",
	FgRed = "\x1b[31m",
	FgGreen = "\x1b[32m",
	FgYellow = "\x1b[33m",
	FgBlue = "\x1b[34m",
	FgMagenta = "\x1b[35m",
	FgCyan = "\x1b[36m",
	FgWhite = "\x1b[37m",

	BgBlack = "\x1b[40m",
	BgRed = "\x1b[41m",
	BgGreen = "\x1b[42m",
	BgYellow = "\x1b[43m",
	BgBlue = "\x1b[44m",
	BgMagenta = "\x1b[45m",
	BgCyan = "\x1b[46m",
	BgWhite = "\x1b[47m",
}

type ConsoleStyle = keyof typeof ConsoleStyles;

/**
 * Available console print options
 */
export interface PrintOptions {
	style?: ConsoleStyle | ConsoleStyle[];
	tagStyle?: ConsoleStyle | ConsoleStyle[];
	tag?: string;
}

/**
 * @param style selected style
 * @returns a string of combined style
 */
function formatStyle(style: ConsoleStyle | ConsoleStyle[]) {
	// Format array of styles
	if (Array.isArray(style)) {
		return style.reduce((prev, curr) => (prev += ConsoleStyles[curr]), "");
	}
	// Format single style
	return ConsoleStyles[style];
}

export function print(text: string, options?: PrintOptions) {
	// Format text styles
	const textStyleString = options?.style ? formatStyle(options.style) : "";
	// Format tag styles
	const tagStyleString = options?.tagStyle
		? formatStyle(options.tagStyle)
		: "";
	// Format tag
	const tagString = options?.tag ? `[${options?.tag?.toUpperCase()}] ` : "";
	// Console log result
	console.log(
		`${tagStyleString}${tagString}${ConsoleStyles.Reset}${textStyleString}${text}${ConsoleStyles.Reset}`
	);
}
