import { Box, Button, HStack, Text, useClipboard } from "@chakra-ui/react"
import { useMemo } from "react"
import { useLocale } from "../../hooks/useLocale"
import { usePrompts } from "../../hooks/usePrompts"
import { PromptCore } from "../../types/prompt"

interface Props {
    prompt: PromptCore
    compiled: string
}

const PromptDisplay = ({ prompt, compiled }: Props) => {
    const { t } = useLocale()

    const title = useMemo(() => {
        return prompt.type === "positive" ? t.POSITIVE_PROMPT : t.NEGATIVE_PROMPT
    }, [prompt])

    const { hasCopied, onCopy } = useClipboard(compiled)
    const { createPrompt } = usePrompts()

    const savePrompt = () => {
        createPrompt(prompt)
    }

    return (
        <Box my={"2"}>
            <Text fontWeight={"semibold"}>{title}</Text>
            <Text fontSize={"sm"} fontFamily={"mono"} userSelect={"all"}>
                {compiled}
            </Text>
            <HStack my={"2"}>
                <Button
                    size={"sm"}
                    variant={"outline"}
                    colorScheme={"brand"}
                    onClick={() => {
                        savePrompt()
                    }}
                >
                    保存
                </Button>
                <Button size={"sm"} variant={"outline"} colorScheme={"brand"} onClick={onCopy}>
                    コピー
                </Button>
            </HStack>
        </Box>
    )
}

export default PromptDisplay
