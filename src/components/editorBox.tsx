import { Box, chakra, HStack, Input, Spacer, Text } from "@chakra-ui/react"
import { useLocale } from "../hooks/useLocale"
import BrandButton from "./common/brandButton"
import BrandInput from "./common/brandInput"
import SpellItem from "./editor/spellItem"
import { useCurrentPromptState } from "../atoms/currentPromptState"
import { useState } from "react"
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import SpellItemSortable from "./editor/spellItemSortable"

const EditorBox = () => {
    const { t } = useLocale()
    const { prompt, moveSpell } = useCurrentPromptState()
    const [spells, setSpells] = useState(prompt.spells)

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (active.id !== over?.id) {
            moveSpell(active.id, over?.id)
            setSpells((prev) => {
                const oldIndex = prev.findIndex((spell) => spell.id === active.id)
                const newIndex = prev.findIndex((spell) => spell.id === over?.id)
                return arrayMove(prev, oldIndex, newIndex)
            })
        }
    }

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
            <Box my={"8"}>
                <DndContext onDragEnd={handleDragEnd}>
                    <SortableContext items={spells} strategy={verticalListSortingStrategy}>
                        {spells.map((spell, index) => (
                            <SpellItemSortable key={spell.id} id={spell.id}>
                                <Box my={"2"}>
                                    <SpellItem spell={spell} inputId={index} />
                                </Box>
                            </SpellItemSortable>
                        ))}
                    </SortableContext>
                </DndContext>
            </Box>
        </Box>
    )
}

export default EditorBox
