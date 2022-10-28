import { Button, Divider, HStack, Spacer, Text } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useMemo } from "react"
import { useLocale } from "../../hooks/useLocale"
import { usePrompts } from "../../hooks/usePrompts"
import { Prompt } from "../../types/prompt"
import { PromptCompiler } from "../../utils/prompt"
import BrandButton from "../common/brandButton"
import MainBox from "../common/mainBox"

interface Props {
    prompt: Prompt
}

const PresetCard = ({ prompt }: Props) => {
    const { t } = useLocale()
    const compiler = new PromptCompiler()

    const compiled = useMemo(() => {
        return compiler.compile(prompt.spells)
    }, [prompt])

    const { deletePrompt } = usePrompts()

    return (
        <MainBox rounded={"md"}>
            <HStack px={"2"} pt={"2"}>
                <Text py={"1"} pl={"2"} fontWeight={"semibold"}>
                    {prompt.title}
                </Text>
                <Spacer />
                <BrandButton title={t.EDIT_PROMPT} variant={"ghost"} fontSize={"2xl"}>
                    <Icon icon={"ant-design:edit-outlined"} />
                </BrandButton>
            </HStack>
            <Text mx={4} mb={"2"} color={"GrayText"}>
                {compiled}
            </Text>
            <Divider />
            <HStack p={"2"}>
                <Button
                    title={t.DELETE_PROMPT}
                    colorScheme={"red"}
                    variant={"ghost"}
                    onClick={(e) => {
                        if (prompt.id) {
                            deletePrompt(prompt.id)
                        }
                    }}
                >
                    <Icon icon={"carbon:trash-can"} />
                </Button>
                <Spacer />

                <BrandButton title={t.COPY} variant={"ghost"}>
                    <Icon icon={"akar-icons:copy"} />
                </BrandButton>
                <BrandButton title={t.LOAD_PROMPT} variant={"solid"} fontSize={"2xl"}>
                    <Icon icon={"mdi:import"} />
                </BrandButton>
            </HStack>
        </MainBox>
    )
}

export default PresetCard
