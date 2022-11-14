import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../utils/theme"
import { RecoilRoot } from "recoil"
import Head from "next/head"
import headData from "../utils/headData"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <ChakraProvider theme={theme}>
                <Head>
                    <title>{headData.title}</title>
                    <meta name="description" content={headData.description} />
                    {/* ogp */}
                    <meta property="og:title" content={headData.title} />
                    <meta property="og:description" content={headData.description} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={headData.canonical} />
                    <meta property="og:image" content={headData.canonical + headData.og.image} />
                    <meta property="og:site_name" content={headData.title} />
                    <meta property="og:locale" content="ja_JP" />
                    {/* twitter */}
                    <meta name="twitter:card" content={headData.twitter.cardType} />
                    <meta name="twitter:site" content={headData.twitter.handle} />
                    <meta name="twitter:creator" content={headData.twitter.handle} />
                </Head>
                <Component {...pageProps} />
            </ChakraProvider>
        </RecoilRoot>
    )
}
