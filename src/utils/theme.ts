import { StyleFunctionProps, extendTheme, StyleConfig, ThemeConfig, withDefaultColorScheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const colors = {
    background: {
        main: "#171F26",
        secondary: "#1D242B",
    },
    brand: {
        100: "#ffed5d",
        200: "#ffe35d",
        300: "#ffd95d",
        400: "#ffcf5d",
        500: "#f3bb59",
        600: "#c09346",
        700: "#a6803c",
        800: "#594520",
        900: "#0c0904",
    },
}

const config: ThemeConfig = {
    initialColorMode: "dark",
}

const styles = {
    global: (props: any) => ({
        body: {
            bg: mode("white", "background.main")(props),
        },
        ".background_main": {
            bg: mode("white", "background.main")(props),
        },
        ".background_secondary": {
            bg: mode("gray.300", "background.secondary")(props),
        },
    }),
}

const components = {
    // Button: {
    //     variants: {
    //         brand: (props: StyleFunctionProps) => ({
    //             ...theme.components.Button.variants.outline(props),
    //             bg: "brand",
    //             color: "background.main",
    //         }),
    //     },
    // },
}

const theme = extendTheme({ colors, config, styles, components }, withDefaultColorScheme({ colorScheme: "accent" }))

export default theme
