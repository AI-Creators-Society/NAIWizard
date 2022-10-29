import { Box, Button, HStack, Spacer, Text, Textarea, useClipboard } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useCurrentPromptState } from "../../atoms/currentPromptState"
import { useLocale } from "../../hooks/useLocale"
import BrandButton from "../common/brandButton"
import BrandTextarea from "../common/brandTextarea"

const GeneratedPromptWidget = () => {
    const { t } = useLocale()
    const { compiled } = useCurrentPromptState()
    const { hasCopied, onCopy } = useClipboard(compiled)

    return (
        <Box my={"2"}>
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
                <BrandButton w={"116"} title={t.COPY} variant={"solid"} fontSize={"xl"} onClick={onCopy}>
                    {hasCopied ? <Icon icon={"bx:check"} /> : <Icon icon={"akar-icons:copy"} />}
                </BrandButton>
            </HStack>
        </Box>
    )
}

export default GeneratedPromptWidget
