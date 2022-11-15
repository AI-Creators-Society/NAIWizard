import {
    Box,
    BoxProps,
    Button,
    Center,
    Divider,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Spacer,
    Text,
    useBoolean,
    useNumberInput,
} from "@chakra-ui/react"
import { Spell } from "../../types/prompt"
import BrandInput from "../common/brandInput"
import SecondaryBox from "../common/secondaryBox"
import { Icon } from "@iconify/react"
import CheckSwitch from "./checkSwitch"
import { KeyboardEvent, KeyboardEventHandler, useEffect, useRef, useState } from "react"
import DragHandle from "./dragHandle"
import { useSortable } from "@dnd-kit/sortable"
import { useCurrentPromptState } from "../../atoms/currentPromptState"
import { useLocale } from "../../hooks/useLocale"
import BrandNumberInput from "../common/brandNumberInput"

export interface SpellItemProps {
    spell: Spell
    index: number
}

const SpellItem = ({ spell, index }: SpellItemProps) => {
    const { t } = useLocale()
    const [enabled, setEnabled] = useState(spell.enabled)
    const [enhancement, setEnhancement] = useState(spell.enhancement.toString())
    const {
        updateSpellContent,
        updateSpellEnabled,
        updateSpellEnhancement,
        insertEmptySpell,
        deleteSpell,
        swapSpellsPrevOrNext,
        focusWithIndex,
    } = useCurrentPromptState()
    const { setActivatorNodeRef, listeners } = useSortable({
        id: spell.id,
    })

    const enhancementRef = useRef<HTMLInputElement>(null)

    // 次の入力にフォーカスする
    const focusNextInput = () => {
        focusWithIndex(index + 1)
        // if (nextInput) {

        // } else {
        //     // 新しい入力を作成する
        //     insertEmptySpell(spell.id)
        // }
    }

    const focusPrevInput = () => {
        focusWithIndex(index - 1)
        // const prevInput = document.getElementById(`${inputId - 1}`)
        // if (prevInput) {
        //     prevInput.focus()
        // }
    }

    const updateEnhancement = (value: string) => {
        const num = parseInt(value)
        if (!isNaN(num)) {
            updateSpellEnhancement(spell.id, num)
        }
        setEnhancement(value)
    }

    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // shift enter
        if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault()
            insertEmptySpell(spell.id)
            return
        }
        // enter to next focus or create
        else if (e.key === "Enter") {
            e.preventDefault()
            focusNextInput()
            return
        }
        // ctrl+arrow up or cmd+arrow up
        else if ((e.key === "ArrowUp" && e.ctrlKey) || (e.key === "ArrowUp" && e.metaKey)) {
            e.preventDefault()
            updateEnhancement((spell.enhancement + 1).toString())
            return
        }
        // ctrl+arrow down
        else if ((e.key === "ArrowDown" && e.ctrlKey) || (e.key === "ArrowDown" && e.metaKey)) {
            e.preventDefault()
            updateEnhancement((spell.enhancement - 1).toString())
            return
        }
        // alt + arrow up
        else if (e.key === "ArrowUp" && e.altKey) {
            e.preventDefault()
            swapSpellsPrevOrNext(spell.id, true)
            return
        }
        // alt + arrow down
        else if (e.key === "ArrowDown" && e.altKey) {
            e.preventDefault()
            swapSpellsPrevOrNext(spell.id, false)
            return
        }
        // arrow up
        else if (e.key === "ArrowUp") {
            e.preventDefault()
            focusPrevInput()
            return
        }
        // arrow down
        else if (e.key === "ArrowDown") {
            e.preventDefault()
            focusNextInput()
            return
        }
        // Backspace
        else if (e.key === "Backspace" && spell.content === "") {
            e.preventDefault()
            focusPrevInput()
            deleteSpell(spell.id)
            return
        }
    }

    return (
        <HStack>
            <SecondaryBox h={["10"]} rounded={"md"} overflow={"hidden"} flex={"1"}>
                <HStack h={"full"}>
                    <CheckSwitch
                        enabled={enabled}
                        onChange={(e) => {
                            setEnabled(e)
                            updateSpellEnabled(spell.id, e)
                        }}
                    />

                    <BrandInput
                        pl={"1"}
                        id={spell.id}
                        defaultValue={spell.content}
                        variant={"flushed"}
                        onKeyDown={(e) => {
                            onInputKeyDown(e)
                        }}
                        onChange={(e) => {
                            updateSpellContent(spell.id, e.target.value)
                        }}
                    />
                    <Spacer />
                    <Box>
                        <BrandNumberInput
                            ref={enhancementRef}
                            value={enhancement}
                            onChange={(e) => {
                                updateEnhancement(e)
                            }}
                            onBlur={() => {
                                if (enhancement === "") {
                                    updateEnhancement("0")
                                }
                            }}
                            allowMouseWheel
                        >
                            <NumberInputField w={"20"} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </BrandNumberInput>
                    </Box>

                    <DragHandle ref={setActivatorNodeRef} {...listeners} />
                </HStack>
            </SecondaryBox>

            <Center w={"12"}>
                <Button
                    title={t.DELETE_SPELL}
                    variant={"ghost"}
                    colorScheme={"red"}
                    onClick={() => {
                        deleteSpell(spell.id)
                    }}
                >
                    <Icon icon={"carbon:trash-can"} />
                </Button>
            </Center>
        </HStack>
    )
}

export default SpellItem
