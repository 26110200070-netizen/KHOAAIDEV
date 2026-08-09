import { RGBA, TextAttributes } from "@opentui/core"
import { For, type JSX } from "solid-js"
import { tint, useTheme } from "../context/theme"
import { logo } from "../logo"

export function Logo() {
  const { theme } = useTheme()
  const whiteBg = RGBA.fromHex("#ffffff")
  const blueColor = RGBA.fromHex("#0284c7")
  const darkGrayColor = RGBA.fromHex("#4b5563")

  const renderLine = (line: string, fg: RGBA, bold: boolean): JSX.Element[] => {
    const shadow = tint(whiteBg, fg, 0.25)
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
          <text fg={shadow} bg={whiteBg} attributes={attrs} selectable={false}>
            ▀
          </text>
        )
      }
      if (char === ",") {
        return (
          <text fg={shadow} bg={whiteBg} attributes={attrs} selectable={false}>
            ▄
          </text>
        )
      }
      return (
        <text fg={fg} bg={whiteBg} attributes={attrs} selectable={false}>
          {char}
        </text>
      )
    })
  }

  return (
    <box
      alignItems="center"
      backgroundColor={whiteBg}
      paddingLeft={3}
      paddingRight={3}
      paddingTop={1}
      paddingBottom={1}
    >
      <For each={logo.left}>
        {(line, index) => (
          <box flexDirection="row" gap={1}>
            <box flexDirection="row">{renderLine(line, blueColor, true)}</box>
            <box flexDirection="row">{renderLine(logo.right[index()], blueColor, true)}</box>
          </box>
        )}
      </For>
      <box marginTop={1} flexDirection="row" alignItems="center">
        <text fg={darkGrayColor} bg={whiteBg} selectable={false}>
          by Khoa Dev
        </text>
      </box>
    </box>
  )
}
