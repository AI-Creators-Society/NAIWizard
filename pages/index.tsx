import { Box, Container, Flex, SimpleGrid, Text } from "@chakra-ui/react"
import Head from "next/head"
import Image from "next/image"

export default function Home() {
    return (
        <>
            <Flex maxW={"full"}>
                <Box className="background_secondary" minW={["sm", "md", "lg"]}>
                    <Text>Left</Text>
                </Box>
                <Box flex={"1"} maxW={["8xl"]} maxH={"full"}>
                    <Text>Center</Text>
                </Box>
                <Box className="background_secondary" minW={["sm", "md", "lg"]}>
                    <Text>Right</Text>
                </Box>
            </Flex>
        </>
    )
}
