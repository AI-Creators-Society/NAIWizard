import { Box, chakra, HStack, Input, Spacer, Text } from "@chakra-ui/react"
import { useLocale } from "../hooks/useLocale"
import BrandButton from "./common/brandButton"
import BrandInput from "./common/brandInput"
import SpellItem from "./editor/spellItem"
import { useCurrentPromptState } from "../atoms/currentPromptState"
import { useState } from "react"
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SpellItemDraggable from "./editor/spellItemDraggable"

const EditorBox = () => {
    const { t } = useLocale()
    const { prompt } = useCurrentPromptState()

    const [spells, setSpells] = useState(prompt.spells)

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (active.id !== over?.id) {
            setSpells((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over?.id)

                const reorderedItems = [...items]
                const [removed] = reorderedItems.splice(oldIndex, 1)
                reorderedItems.splice(newIndex, 0, removed)

                return reorderedItems
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
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={spells} strategy={verticalListSortingStrategy}>
                        {spells.map((spell, index) => (
                            <SpellItemDraggable key={spell.id} id={spell.id}>
                                <Box my={"2"}>
                                    <SpellItem spell={spell} inputId={index} />
                                </Box>
                            </SpellItemDraggable>
                        ))}
                    </SortableContext>
                </DndContext>
            </Box>
        </Box>
    )
}

export default EditorBox
