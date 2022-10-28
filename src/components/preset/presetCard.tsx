import { Button, Divider, HStack, Spacer, Text } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { Prompt } from "../../types/prompt"
import BrandButton from "../common/brandButton"
import MainBox from "../common/mainBox"

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
                <BrandButton variant={"ghost"} fontSize={"2xl"}>
                    <Icon icon={"akar-icons:more-horizontal"} />
                </BrandButton>
            </HStack>
            <Divider />
            <HStack p={"2"}>
                <Button colorScheme={"red"} variant={"ghost"}>
                    <Icon icon={"carbon:trash-can"} />
                </Button>
                <Spacer />

                <BrandButton variant={"ghost"}>
                    <Icon icon={"akar-icons:copy"} />
                </BrandButton>
                <BrandButton variant={"solid"} fontSize={"2xl"}>
                    <Icon icon={"mdi:import"} />
                </BrandButton>
            </HStack>
        </MainBox>
    )
}

export default PresetCard
