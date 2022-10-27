import { Box, Button, Divider, HStack, Text } from "@chakra-ui/react"
import { Prompt } from "../types/prompt"
import SecondaryBox from "./common/secondaryBox"

interface Props {
    prompt: Prompt
}

const PresetCard = ({ prompt }: Props) => {
    return (
        <SecondaryBox>
            <Text p={"2"} fontWeight={"semibold"}>
                {prompt.title}
            </Text>
            <Divider />
            <HStack>
                <Button>A</Button>
            </HStack>
        </SecondaryBox>
    )
}

export default PresetCard
