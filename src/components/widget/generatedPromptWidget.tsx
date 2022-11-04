import { Box, Button, HStack, Spacer, Text, Textarea, useClipboard } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useCurrentPromptState } from "../../atoms/currentPromptState"
import { useLocale } from "../../hooks/useLocale"
import BrandButton from "../common/brandButton"
import BrandTextarea from "../common/brandTextarea"

const GeneratedPromptWidget = () => {
    const { t } = useLocale()
    const { compiled } = useCurrentPromptState()
    const { hasCopied, onCopy, setValue } = useClipboard(compiled)

    useEffect(() => {
        setValue(compiled)
    }, [compiled])

    return (
        <Box my={"2"}>
            <Text p={"2"} fontWeight={"semibold"}>
                {t.PROMPT}
            </Text>
            <BrandTextarea
                className={"background_secondary"}
                placeholder={t.PROMPT_PLACEHOLDER}
                value={compiled}
                my={"2"}
                contentEditable={false}
                onChange={() => {}}
            />
            <HStack>
                <Spacer />
                <BrandButton title={t.COPY} variant={"solid"} onClick={onCopy}>
                    {hasCopied ? <Icon icon={"bx:check"} /> : <Icon icon={"akar-icons:copy"} />}
                </BrandButton>
            </HStack>
        </Box>
    )
}

export default GeneratedPromptWidget
