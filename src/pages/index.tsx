import { Box, Flex, Text } from "@chakra-ui/react"
import Head from "next/head"
import EditorBox from "../components/editorBox"
import PresetsSideBar from "../components/presetsSideBar"
import WidgetSideBar from "../components/widgetSideBar"
import { Prompt } from "../types/prompt"
import headData from "../utils/headData"

export default function Home() {
    return (
        <>
            <Head>
                <title>{`ホーム | ${headData.title}`}</title>
            </Head>
            <Flex w={"full"} maxH={"full"} overflow={"hidden"}>
                {/* サイドバー */}
                <PresetsSideBar />

                {/* エディター */}
                <EditorBox />

                {/* 右サイド */}
                <WidgetSideBar />
            </Flex>
        </>
    )
}
