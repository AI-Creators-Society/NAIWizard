import { Box, Button, Center, chakra, HStack, Input, Spacer, Text } from "@chakra-ui/react"
import { useLocale } from "../hooks/useLocale"
import BrandButton from "./common/brandButton"
import BrandInput from "./common/brandInput"
import SpellItem from "./editor/spellItem"
import { useCurrentPromptState } from "../atoms/currentPromptState"
import { useEffect, useState } from "react"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import SpellItemSortable from "./editor/spellItemSortable"
import { Icon } from "@iconify/react"
import { usePrompts } from "../hooks/usePrompts"
import { useResponsive } from "../hooks/useResponsive"
import { useSidebarDrawerState } from "../atoms/sidebarDrawerState"

const EditorBox = () => {
    const { t } = useLocale()
    const { prompt, moveSpell, appendEmptySpell, updatePromptTitle } = useCurrentPromptState()
    const [spells, setSpells] = useState(prompt.spells)
    const { updateOrCreatePrompt } = usePrompts()
    const { isPC } = useResponsive()
    const { toggleDrawer } = useSidebarDrawerState()

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

    const savePrompt = async () => {
        await updateOrCreatePrompt(prompt)
    }

    useEffect(() => {
        setSpells(prompt.spells)
    }, [prompt])

    return (
        <Box flex={"1"} minW={["sm", "md", "lg", "lg"]} maxW={"full"} maxH={"full"} p={["0", "2", "2"]}>
            {/* drawer toggle */}
            {!isPC && (
                <HStack mb={"2"}>
                    <Button colorScheme={"brand"} variant={"outline"} size={"md"} onClick={toggleDrawer}>
                        <Icon icon={"charm:menu-hamburger"} />
                    </Button>
                </HStack>
            )}

            <HStack>
                <BrandInput
                    value={prompt.title}
                    placeholder={t.UNTITLED_SPELLS}
                    variant={"flushed"}
                    onChange={(e) => {
                        updatePromptTitle(e.target.value)
                    }}
                />
                <Spacer />
                <BrandButton
                    title={t.SAVE_SPELLS}
                    variant={"solid"}
                    fontSize={"2xl"}
                    onClick={() => {
                        savePrompt()
                    }}
                >
                    <Icon icon={"bx:save"} />
                </BrandButton>
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

                {/* 追加ボタン */}
                <Center>
                    <BrandButton
                        fontSize={"xl"}
                        onClick={() => {
                            appendEmptySpell()
                        }}
                    >
                        <Icon icon={"fluent:add-12-filled"} />
                    </BrandButton>
                </Center>
            </Box>
        </Box>
    )
}

export default EditorBox
