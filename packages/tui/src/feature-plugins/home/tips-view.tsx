import type { TuiPluginApi } from "@opencode-ai/plugin/tui"
import { RGBA, TextAttributes } from "@opentui/core"
import open from "open"
import { useTheme } from "../../context/theme"

export function Tips(props: { api: TuiPluginApi; connected?: boolean }) {
  const theme = useTheme().theme
  const fbBlue = RGBA.fromHex("#1877F2")
  const cyanBlue = RGBA.fromHex("#38bdf8")

  const handleOpenFb = () => {
    open("https://www.facebook.com/khoa.high.tech.dev").catch(() => {})
  }

  return (
    <box flexDirection="row" maxWidth="100%" gap={1} alignItems="center">
      <box backgroundColor={fbBlue} paddingLeft={1} paddingRight={1} onMouseUp={handleOpenFb}>
        <text fg={RGBA.fromHex("#ffffff")} attributes={TextAttributes.BOLD} selectable={false}>
          f
        </text>
      </box>
      <text fg={cyanBlue} attributes={TextAttributes.BOLD} selectable={false}>
        KhoaDev:
      </text>
      <text fg={theme.text} underline={true} onMouseUp={handleOpenFb}>
        https://www.facebook.com/khoa.high.tech.dev
      </text>
      <text fg={theme.textMuted} selectable={false} onMouseUp={handleOpenFb}>
        (Click để vào FB)
      </text>
    </box>
  )
}
