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
    useCallbackRef,
} from "@chakra-ui/react"
import { Spell } from "../../types/prompt"
import BrandInput from "../common/brandInput"
import SecondaryBox from "../common/secondaryBox"
import { Icon } from "@iconify/react"
import CheckSwitch from "./checkSwitch"
import { KeyboardEvent, KeyboardEventHandler, useCallback, useEffect, useRef, useState } from "react"
import DragHandle from "./dragHandle"
import { useSortable } from "@dnd-kit/sortable"
import { useCurrentPromptState } from "../../atoms/currentPromptState"
import { useLocale } from "../../hooks/useLocale"
import BrandNumberInput from "../common/brandNumberInput"
import BrandTextarea from "../common/brandTextarea"

export interface SpellItemProps {
    spell: Spell
    index: number
}

const SpellItem = ({ spell, index }: SpellItemProps) => {
    const { t } = useLocale()
    const [enabled, setEnabled] = useState(spell.enabled)
    const [enhancement, setEnhancement] = useState(spell.enhancement.toString())
    const {
        prompt,
        shouldFocusTo,
        updateSpellContent,
        updateSpellEnabled,
        updateSpellEnhancement,
        insertEmptySpell,
        appendEmptySpell,
        deleteSpell,
        swapSpellsPrevOrNext,
        focusWithIndex,
        // setShouldFocusTo,
        finishFocus,
    } = useCurrentPromptState()
    const { setActivatorNodeRef, listeners } = useSortable({
        id: spell.id,
    })

    const spellContentRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
    const setSpellContentRef = useCallbackRef(
        (node: HTMLInputElement | HTMLTextAreaElement | null) => {
            if (node) {
                spellContentRef.current = node
            }
        },
        [shouldFocusTo]
    )
    const enhancementRef = useRef<HTMLInputElement>(null)

    const [textAreaSize, setTextAreaSize] = useState(0)

    // 次の入力にフォーカスする
    const focusNextInput = () => {
        if (index < prompt.spells.length - 1) {
            focusWithIndex(index + 1)
        } else {
            // 追加する
            appendEmptySpell()
            focusWithIndex(index + 1)
        }
    }

    const focusPrevInput = () => {
        focusWithIndex(index - 1)
    }

    const updateEnhancement = (value: string) => {
        const num = parseInt(value)
        if (!isNaN(num)) {
            updateSpellEnhancement(spell.id, num)
        }
        setEnhancement(value)
    }

    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // ctrl enter
        if ((e.key === "Enter" && e.ctrlKey) || (e.key === "Enter" && e.metaKey)) {
            e.preventDefault()
            insertEmptySpell(spell.id)
            return
        }
        // shift enter
        else if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault()
            setTextAreaSize((prev) => prev + 1)
            spellContentRef.current?.focus()
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
            focusPrevInput()
            return
        }
        // ctrl+arrow down
        else if ((e.key === "ArrowDown" && e.ctrlKey) || (e.key === "ArrowDown" && e.metaKey)) {
            e.preventDefault()
            focusNextInput()
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
        // arrow up + shift
        else if (e.key === "ArrowUp" && e.shiftKey) {
            e.preventDefault()
            updateEnhancement((spell.enhancement + 1).toString())
        }
        // arrow down + shift
        else if (e.key === "ArrowDown" && e.shiftKey) {
            e.preventDefault()
            updateEnhancement((spell.enhancement - 1).toString())
        }
        // arrow up
        else if (e.key === "ArrowUp") {
            if (textAreaSize > 0) {
                return
            }
            e.preventDefault()
            focusPrevInput()
            return
        }
        // arrow down
        else if (e.key === "ArrowDown") {
            if (textAreaSize > 0) {
                return
            }
            e.preventDefault()
            focusNextInput()
            return
        }
        // shift + backspace
        else if (e.key === "Backspace" && e.shiftKey) {
            e.preventDefault()
            setTextAreaSize((prev) => prev - 1)
            spellContentRef.current?.focus()
            return
        }
        // Backspace
        else if (e.key === "Backspace" && spell.content === "") {
            e.preventDefault()
            deleteSpell(spell.id)
            focusPrevInput()
            return
        }
    }

    useEffect(() => {
        if (index === shouldFocusTo) {
            if (spellContentRef.current) {
                spellContentRef.current.focus()
            }
        }
    }, [index, shouldFocusTo])

    return (
        <HStack>
            <SecondaryBox
                h={(() => {
                    if (textAreaSize > 0) {
                        return 12 + textAreaSize * 4
                    } else {
                        return "10"
                    }
                })()}
                rounded={"md"}
                overflow={"hidden"}
                flex={"1"}
            >
                <HStack h={"full"}>
                    <CheckSwitch
                        enabled={enabled}
                        onChange={(e) => {
                            setEnabled(e)
                            updateSpellEnabled(spell.id, e)
                        }}
                    />

                    {textAreaSize > 0 ? (
                        <BrandTextarea
                            pl={"1"}
                            h={"full"}
                            id={spell.id}
                            defaultValue={spell.content}
                            variant={"flushed"}
                            ref={(e) => {
                                setSpellContentRef(e)
                            }}
                            onKeyDown={(e) => {
                                onInputKeyDown(e)
                            }}
                            onChange={(e) => {
                                updateSpellContent(spell.id, e.target.value)
                            }}
                            onClick={() => {
                                // 自身にフォーカスをセット
                            }}
                        />
                    ) : (
                        <BrandInput
                            pl={"1"}
                            id={spell.id}
                            defaultValue={spell.content}
                            variant={"flushed"}
                            ref={setSpellContentRef}
                            onKeyDown={(e) => {
                                onInputKeyDown(e)
                            }}
                            onChange={(e) => {
                                updateSpellContent(spell.id, e.target.value)
                            }}
                            onClick={() => {
                                // 自身にフォーカスをセット
                            }}
                        />
                    )}

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
