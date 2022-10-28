import { Box, Flex, Text } from "@chakra-ui/react"
import EditorBox from "../components/editorBox"
import PresetsSideBar from "../components/presetsSideBar"
import WidgetSideBar from "../components/widgetSideBar"
import { Prompt } from "../types/prompt"

// const prompts: Prompt[] = [
//     {
//         id: 1,
//         title: "水墨画風",
//         type: "positive",
//         spells: [
//             {
//                 id: "0",
//                 content: "japanese painting",
//                 enhancement: 0,
//                 enabled: true,
//                 parentId: "",
//             },
//             {
//                 id: "1",
//                 content: "ukiyo-e",
//                 enhancement: 0,
//                 enabled: true,
//                 parentId: "",
//             },
//         ],
//     },
// ]

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
