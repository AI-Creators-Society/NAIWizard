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
import { useState } from "react"
import DragHandle from "./dragHandle"
import { useSortable } from "@dnd-kit/sortable"
import { useCurrentPromptState } from "../../atoms/currentPromptState"

export interface SpellItemProps {
    spell: Spell
    inputId: number
}

const SpellItem = ({ spell, inputId }: SpellItemProps) => {
    const [enabled, setEnabled] = useState(spell.enabled)
    const { updateSpell } = useCurrentPromptState()
    const { setActivatorNodeRef, listeners } = useSortable({
        id: spell.id,
    })

    // 次の入力にフォーカスする
    const focusNextInput = () => {
        const nextInput = document.getElementById(`${inputId + 1}`)
        if (nextInput) {
            nextInput.focus()
        } else {
            // TODO: 新しい入力を作成する
        }
    }

    const focusPrevInput = () => {
        const prevInput = document.getElementById(`${inputId - 1}`)
        if (prevInput) {
            prevInput.focus()
        }
    }

    return (
        <SecondaryBox h={["14"]} rounded={"md"} overflow={"hidden"}>
            <HStack h={"full"}>
                <CheckSwitch
                    enabled={enabled}
                    onChange={(e) => {
                        setEnabled(e)
                        updateSpell(spell.id, {
                            ...spell,
                            enabled: e,
                        })
                    }}
                />

                {/* <Divider orientation={"vertical"} /> */}

                <BrandInput
                    pl={"1"}
                    id={String(inputId)}
                    defaultValue={spell.content}
                    variant={"flushed"}
                    onKeyDown={(e) => {
                        // shift enter
                        if (e.key === "Enter" && e.shiftKey) {
                            // TODO: 入力の挿入
                        }
                        // enter to next focus or create
                        else if (e.key === "Enter") {
                            focusNextInput()
                        }
                        // ctrl+arrow up or cmd+arrow up
                        else if ((e.key === "ArrowUp" && e.ctrlKey) || (e.key === "ArrowUp" && e.metaKey)) {
                            focusPrevInput()
                        }
                        // ctrl+arrow down
                        else if ((e.key === "ArrowDown" && e.ctrlKey) || (e.key === "ArrowDown" && e.metaKey)) {
                            focusNextInput()
                        }
                    }}
                    onChange={(e) => {
                        updateSpell(spell.id, {
                            ...spell,
                            content: e.target.value,
                        })
                    }}
                />
                <Spacer />
                <Box py={"2"}>
                    <NumberInput
                        defaultValue={spell.enhancement}
                        onChange={(e) => {
                            const value = Number(e)
                            updateSpell(spell.id, {
                                ...spell,
                                enhancement: value,
                            })
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
