const reset = "\x1b[0m"
const bold = "\x1b[1m"
const dim = "\x1b[90m"
const cyan = "\x1b[36m"

function wordmark(pad = "  ") {
  const lines = [
    "█  █  █  █  ▄▀▀▄  █▀▀█   █▀▀█  ▀█▀",
    "█▄▀   █▀▀█  █  █  █▄▄█   █▄▄█   █ ",
    "█ ▀▄  █  █  ▀▄▄▀  █  █   █  █  ▄█▄",
  ]
  return lines.map((line) => `${pad}${bold}${cyan}${line}${reset}`)
}

export function sessionEpilogue(input: { title: string; sessionID?: string }) {
  const weak = (text: string) => `${dim}${text.padEnd(10, " ")}${reset}`
  return [
    ...wordmark("  "),
    "",
    `  ${weak("Session")}${bold}${input.title}${reset}`,
    `  ${weak("Continue")}${bold}khoaaidev -s ${input.sessionID}${reset}`,
    "",
  ].join("\n")
}
