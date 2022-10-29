import { ReactNode } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../utils/theme"
import { RecoilRoot } from "recoil"
import { ColorModeScript } from "@chakra-ui/react"

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
            <RecoilRoot>
                <ChakraProvider theme={theme}>
                    <head></head>
                    <body>
                        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                        {children}
                    </body>
                </ChakraProvider>
            </RecoilRoot>
        </html>
    )
}
