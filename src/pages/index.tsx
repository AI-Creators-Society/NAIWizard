import { Box, Container, Flex, SimpleGrid, Text } from "@chakra-ui/react"
import Head from "next/head"
import Image from "next/image"
import SecondaryBox from "../components/common/secondaryBox"
import PresetsSideBar from "../components/presetsSideBar"

export default function Home() {
    return (
        <Flex maxW={"full"} h={"full"}>
            {/* サイドバー */}
            <PresetsSideBar prompts={[]} />

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
