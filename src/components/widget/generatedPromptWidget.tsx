import { Box, Button, HStack, Spacer, Text, Textarea } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useCurrentPromptState } from "../../atoms/currentPromptState"
import { useLocale } from "../../hooks/useLocale"
import BrandButton from "../common/brandButton"
import BrandTextarea from "../common/brandTextarea"

const GeneratedPromptWidget = () => {
    const { t } = useLocale()
    const { compiled } = useCurrentPromptState()

    return (
        <Box>
            <Text p={"2"} fontWeight={"semibold"}>
                {t.PROMPT}
            </Text>
            <BrandTextarea
                className={"background_secondary"}
                placeholder={t.PROMPT_PLACEHOLDER}
                value={compiled}
                resize={"none"}
                isReadOnly={true}
                my={"2"}
            />
            <HStack>
                <Spacer />
                <BrandButton title={t.COPY} variant={"solid"}>
                    <Icon icon={"akar-icons:copy"} />
                </BrandButton>
            </HStack>
        </Box>
    )
}

export default GeneratedPromptWidget
