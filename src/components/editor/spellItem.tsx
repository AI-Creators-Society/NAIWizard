import {
    Box,
    BoxProps,
    Button,
    Divider,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Spacer,
    Text,
} from "@chakra-ui/react"
import { Spell } from "../../types/prompt"
import BrandInput from "../common/brandInput"
import SecondaryBox from "../common/secondaryBox"
import { Icon } from "@iconify/react"
import CheckSwitch from "./checkSwitch"
import { KeyboardEvent, KeyboardEventHandler, useState } from "react"
import DragHandle from "./dragHandle"
import { useSortable } from "@dnd-kit/sortable"
import { useCurrentPromptState } from "../../atoms/currentPromptState"
import { useLocale } from "../../hooks/useLocale"

export interface SpellItemProps {
    spell: Spell
    inputId: number
}

const SpellItem = ({ spell, inputId }: SpellItemProps) => {
    const { t } = useLocale()
    const [enabled, setEnabled] = useState(spell.enabled)
    const {
        updateSpellContent,
        updateSpellEnabled,
        updateSpellEnhance,
        insertEmptySpell,
        deleteSpell,
        swapSpellsPrevOrNext,
    } = useCurrentPromptState()
    const { setActivatorNodeRef, listeners } = useSortable({
        id: spell.id,
    })

    // 次の入力にフォーカスする
    const focusNextInput = () => {
        const nextInput = document.getElementById(`${inputId + 1}`)
        if (nextInput) {
            nextInput.focus()
        } else {
            // 新しい入力を作成する
            insertEmptySpell(spell.id)
        }
    }

    const focusPrevInput = () => {
        const prevInput = document.getElementById(`${inputId - 1}`)
        if (prevInput) {
            prevInput.focus()
        }
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
            // TODO: エンハンス調整
        }
        // ctrl+arrow down
        else if ((e.key === "ArrowDown" && e.ctrlKey) || (e.key === "ArrowDown" && e.metaKey)) {
            // TODO: エンハンス調整
        }
        // alt + arrow up
        else if (e.key === "ArrowUp" && e.altKey) {
            // TODO: 上下スワップ
            swapSpellsPrevOrNext(spell.id, true)
        }
        // alt + arrow down
        else if (e.key === "ArrowDown" && e.altKey) {
            // TODO: 上下スワップ
            swapSpellsPrevOrNext(spell.id, false)
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
        <SecondaryBox h={["14"]} rounded={"md"} overflow={"hidden"}>
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
                    id={String(inputId)}
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
                <Box py={"2"}>
                    <NumberInput
                        defaultValue={spell.enhancement}
                        onChange={(e) => {
                            const value = Number(e)
                            updateSpellEnhance(spell.id, value)
                        }}
                    >
                        <NumberInputField w={"20"} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Box>

                <DragHandle ref={setActivatorNodeRef} {...listeners} />
            </HStack>
        </SecondaryBox>
    )
}

export default SpellItem
