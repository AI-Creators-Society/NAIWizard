import { Box, Button, Divider, HStack, Spacer, Text } from "@chakra-ui/react"
import { Prompt } from "../types/prompt"
import MainBox from "./common/mainBox"

interface Props {
    prompt: Prompt
}

const PresetCard = ({ prompt }: Props) => {
    return (
        <MainBox rounded={"md"}>
            <HStack p={"2"}>
                <Text py={"1"} pl={"2"} fontWeight={"semibold"}>
                    {prompt.title}
                </Text>
                <Spacer />
                <Button variant={"ghost"} colorScheme={"brand"}>
                    L
                </Button>
            </HStack>
            <Divider />
            <HStack p={"2"}>
                <Button variant={"ghost"} colorScheme={"brand"}>
                    D
                </Button>
                <Button variant={"ghost"} colorScheme={"brand"}>
                    E
                </Button>

                <Spacer />
                <Button variant={"solid"} colorScheme={"brand"}>
                    I
                </Button>
            </HStack>
        </MainBox>
    )
}

export default PresetCard
