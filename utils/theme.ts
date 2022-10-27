import { extendTheme, StyleConfig, ThemeConfig, withDefaultColorScheme } from "@chakra-ui/react"

const colors = {
    background: {
        main: "#171F26",
        secondary: "#1D242B",
    },
    brand: "#F3BB59",
}

const config: ThemeConfig = {
    initialColorMode: "dark",
}

const styles = {
    global: {
        body: {
            bg: "background.main",
        },
    },
}

const theme = extendTheme({ colors, config, styles }, withDefaultColorScheme({ colorScheme: "accent" }))

export default theme
