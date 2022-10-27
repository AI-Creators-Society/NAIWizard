import { Box, Container, Flex, Text } from "@chakra-ui/react"
import Head from "next/head"
import Image from "next/image"

export default function Home() {
    return (
        <>
            <Flex w={"max"} backgroundColor={"background.main"}>
                <Box>
                    <Text>Left</Text>
                </Box>
                <Box>
                    <Text>Center</Text>
                </Box>
                <Box>
                    <Text>Right</Text>
                </Box>
            </Flex>
        </>
    )
}
