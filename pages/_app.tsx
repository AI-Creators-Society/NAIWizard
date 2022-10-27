import "../styles/globals.css"
import type { AppProps } from "next/app"
import { createTheme, NextUIProvider } from "@nextui-org/react"

const darkTheme = createTheme({
    type: "dark",
    theme: {
        colors: {
            background: "#171F26",
            secondaryBackground: "#1D242B",
            text: "#fff",
            accent: "#F3BB59",
        },
        space: {},
        fonts: {},
    },
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider theme={darkTheme}>
            <Component {...pageProps} />
        </NextUIProvider>
    )
}
