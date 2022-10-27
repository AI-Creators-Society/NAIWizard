import { Divider, HStack, Spacer, Text } from "@chakra-ui/react"
import { Prompt } from "../types/prompt"
import BrandButton from "./common/brandButton"
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
                <BrandButton variant={"ghost"}>L</BrandButton>
            </HStack>
            <Divider />
            <HStack p={"2"}>
                <BrandButton variant={"ghost"}>D</BrandButton>
                <BrandButton variant={"ghost"}>E</BrandButton>

                <Spacer />
                <BrandButton variant={"solid"}>I</BrandButton>
            </HStack>
        </MainBox>
    )
}

export default PresetCard
