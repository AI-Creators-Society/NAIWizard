import { Box, Flex, Text } from "@chakra-ui/react"
import EditorBox from "../components/editorBox"
import PresetsSideBar from "../components/presetsSideBar"
import WidgetSideBar from "../components/widgetSideBar"
import { Prompt } from "../types/prompt"

export default function Home() {
    return (
        <Flex w={"full"} h={"full"}>
            {/* サイドバー */}
            <PresetsSideBar />

            {/* エディター */}
            <EditorBox />

            {/* 右サイド */}
            <WidgetSideBar />
        </Flex>
    )
}
