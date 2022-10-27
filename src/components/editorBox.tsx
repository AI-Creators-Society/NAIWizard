import { Box, HStack, Input, Spacer, Text } from "@chakra-ui/react"
import { useLocale } from "../hooks/useLocale"
import { usePrompt } from "../hooks/usePrompt"
import BrandButton from "./common/brandButton"
import BrandInput from "./common/brandInput"
import SpellBlock from "./editor/spellBlock"

const EditorBox = () => {
    const { t } = useLocale()
    const { prompt } = usePrompt()

    return (
        <Box flex={"1"} minW={["sm", "md", "lg", "lg"]} maxW={"full"} maxH={"full"} p={["0", "0", "4"]}>
            <HStack>
                <BrandInput defaultValue={t.UNTITLED_SPELLS} placeholder={t.UNTITLED_SPELLS} variant={"flushed"} />
                <Spacer />
                <BrandButton variant={"solid"}>S</BrandButton>
            </HStack>

            {/* 呪文一覧 */}
            <Box>
                {prompt.spells.map((spell, index) => (
                    <Box key={index} my={"2"}>
                        <SpellBlock spell={spell} />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default EditorBox
