// pages/_document.js

import { Html, Head, Main, NextScript } from "next/document"
import { ColorModeScript } from "@chakra-ui/react"
import theme from "../utils/theme"

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                {/* 👇 Here's the script */}
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
