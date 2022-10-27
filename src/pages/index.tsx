import { Box, Flex, Text } from "@chakra-ui/react"
import SecondaryBox from "../components/common/secondaryBox"
import PresetsSideBar from "../components/presetsSideBar"
import { Prompt } from "../types/prompt"

const prompts: Prompt[] = [
    {
        id: "1",
        title: "水墨画風",
        type: "positive",
        spells: [
            {
                text: "japanese painting",
                enhancement: 0,
                enabled: true,
                children: [],
            },
            {
                text: "ukiyo-e",
                enhancement: 0,
                enabled: true,
                children: [],
            },
        ],
    },
]

export default function Home() {
    return (
        <Flex maxW={"full"} h={"full"}>
            {/* サイドバー */}
            <PresetsSideBar prompts={prompts} />

            {/* エディター */}
            <Box flex={"1"} minW={["sm", "md", "lg", "lg"]} maxW={"full"} maxH={"full"}>
                <Text>新規呪文</Text>
            </Box>

            {/* 右サイド */}
            <SecondaryBox className="background_secondary" w={["md", "lg", "lg"]} minW={"md"}>
                <Text>プロンプト</Text>
            </SecondaryBox>
        </Flex>
    )
}
