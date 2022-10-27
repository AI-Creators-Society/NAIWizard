import { Box, HStack, Input, Spacer, Text } from "@chakra-ui/react"
import { useLocale } from "../hooks/useLocale"
import BrandButton from "./common/brandButton"
import BrandInput from "./common/brandInput"
import SpellBlock from "./editor/spellBlock"
import { DragDropContext } from "react-beautiful-dnd"
import { useCurrentPromptState } from "../atoms/currentPromptState"

const EditorBox = () => {
    const { t } = useLocale()
    const { prompt } = useCurrentPromptState()

    return (
        <Box flex={"1"} minW={["sm", "md", "lg", "lg"]} maxW={"full"} maxH={"full"} p={["0", "0", "4"]}>
            <HStack>
                <BrandInput
                    defaultValue={prompt.title === "" ? t.UNTITLED_SPELLS : prompt.title}
                    placeholder={t.UNTITLED_SPELLS}
                    variant={"flushed"}
                />
                <Spacer />
                <BrandButton variant={"solid"}>S</BrandButton>
            </HStack>

            {/* 呪文一覧 */}
            <Box>
                {prompt.spells.map((spell, index) => (
                    <Box key={index} my={"2"}>
                        <SpellBlock spell={spell} inputId={index} />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default EditorBox
