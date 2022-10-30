import { Box, Button, HStack, Spacer, Switch, Text, useBoolean, useClipboard } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { useLocale } from "../../hooks/useLocale"
import { usePrompts } from "../../hooks/usePrompts"
import { PromptCore } from "../../types/prompt"

interface ImportedPrompt {
    prompt: PromptCore
    compiled: string
}

interface Props {
    original: ImportedPrompt
    addition: ImportedPrompt
}

const PromptDisplay = ({ original, addition }: Props) => {
    const { t } = useLocale()
    const [isOriginal, setIsOriginal] = useBoolean(false)
    const [prompt, compiled] = useMemo(() => {
        return isOriginal ? [original.prompt, original.compiled] : [addition.prompt, addition.compiled]
    }, [isOriginal, original, addition])

    const title = useMemo(() => {
        return prompt.type === "positive" ? t.POSITIVE_PROMPT : t.NEGATIVE_PROMPT
    }, [prompt])

    const { hasCopied, onCopy, setValue } = useClipboard(compiled)
    const { createPrompt } = usePrompts()

    const savePrompt = () => {
        createPrompt(prompt)
    }

    useEffect(() => {
        setValue(compiled)
    }, [compiled])

    return (
        <Box my={"2"}>
            <Text fontWeight={"semibold"}>{title}</Text>
            <Text fontSize={"sm"} fontFamily={"mono"} userSelect={"all"}>
                {compiled === "" ? "<なし>" : compiled}
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
                    {hasCopied ? "コピー！" : "コピー"}
                </Button>

                <Spacer />

                <Switch
                    defaultChecked={isOriginal}
                    colorScheme={"brand"}
                    onChange={() => {
                        setIsOriginal.toggle()
                    }}
                />
                <Text>プリセットを含める</Text>
            </HStack>
        </Box>
    )
}

export default PromptDisplay
