import { RGBA, TextAttributes } from "@opentui/core"
import { createSignal, onCleanup, onMount, For, type JSX } from "solid-js"
import { tint, useTheme } from "../context/theme"
import { logo } from "../logo"

export function Logo() {
  const { theme } = useTheme()
  const blueColor = RGBA.fromHex("#38bdf8")

  const subtitleText = "by Khoa Dev"
  const [step, setStep] = createSignal(0)

  onMount(() => {
    const timer = setInterval(() => {
      setStep((s) => s + 1)
    }, 80)
    onCleanup(() => clearInterval(timer))
  })

  const getCharColor = (index: number) => {
    const len = subtitleText.length
    const cycle = (len + 4) * 2 - 2
    const rawPos = step() % cycle
    const wavePos = rawPos < len + 4 ? rawPos - 2 : cycle - rawPos - 2

    const dist = Math.abs(index - wavePos)
    if (dist === 0) return { fg: RGBA.fromHex("#ffffff"), bold: true }
    if (dist === 1) return { fg: RGBA.fromHex("#e5e7eb"), bold: true }
    if (dist === 2) return { fg: RGBA.fromHex("#9ca3af"), bold: false }
    if (dist === 3) return { fg: RGBA.fromHex("#4b5563"), bold: false }
    return { fg: RGBA.fromHex("#1f2937"), bold: false }
  }

  const renderLine = (line: string, fg: RGBA, bold: boolean): JSX.Element[] => {
    const shadow = tint(theme.background, fg, 0.25)
    const attrs = bold ? TextAttributes.BOLD : undefined
    return Array.from(line).map((char) => {
      if (char === "_") {
        return (
          <text fg={fg} bg={shadow} attributes={attrs} selectable={false}>
            {" "}
          </text>
        )
      }
      if (char === "^") {
        return (
          <text fg={fg} bg={shadow} attributes={attrs} selectable={false}>
            ▀
          </text>
        )
      }
      if (char === "~") {
        return (
          <text fg={shadow} attributes={attrs} selectable={false}>
            ▀
          </text>
        )
      }
      if (char === ",") {
        return (
          <text fg={shadow} attributes={attrs} selectable={false}>
            ▄
          </text>
        )
      }
      return (
        <text fg={fg} attributes={attrs} selectable={false}>
          {char}
        </text>
      )
    })
  }

  return (
    <box alignItems="center">
      <For each={logo.left}>
        {(line, index) => (
          <box flexDirection="row" gap={1}>
            <box flexDirection="row">{renderLine(line, blueColor, true)}</box>
            <box flexDirection="row">{renderLine(logo.right[index()], blueColor, true)}</box>
          </box>
        )}
      </For>
      <box marginTop={1} flexDirection="row" alignItems="center">
        <For each={Array.from(subtitleText)}>
          {(char, index) => {
            const style = () => getCharColor(index())
            return (
              <text
                fg={style().fg}
                attributes={style().bold ? TextAttributes.BOLD : undefined}
                selectable={false}
              >
                {char}
              </text>
            )
          }}
        </For>
      </box>
    </box>
  )
}
