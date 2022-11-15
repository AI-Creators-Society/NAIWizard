import { Prompt, PromptCore, Spell } from "../types/prompt"
import { generateRandomId } from "../utils/random"
import { atom, useRecoilState } from "recoil"
import { compileSpells } from "../utils/prompt"
import { arrayMove } from "@dnd-kit/sortable"
import { useEffect } from "react"
import { Preset } from "../utils/preset"

const currentPromptStateKey = "currentPromptState"

export interface CurrentPromptState {
    prompt: Prompt
    compiled: string
}

export const initialCurrentPromptState: CurrentPromptState = {
    prompt: Preset.InitialPositivePrompt(),
    compiled: "",
}

export const currentPromptStateAtom = atom<CurrentPromptState>({
    key: currentPromptStateKey,
    default: initialCurrentPromptState,
})

export const useCurrentPromptState = () => {
    const [currentPromptState, setCurrentPromptState] = useRecoilState(currentPromptStateAtom)
    const { prompt, compiled } = currentPromptState

    // useEffect(() => {
    //     const newCompiled = compileSpells(prompt.spells)
    //     setCurrentPromptState((state) => ({ prompt: prompt, compiled: newCompiled }))
    // }, [])

    const setPrompt = (prompt: Prompt) => {
        const newCompiled = compileSpells(prompt.spells)
        setCurrentPromptState({
            prompt,
            compiled: newCompiled,
        })
    }

    const updateSpells = (spells: Spell[]) => {
        const newPrompt = {
            ...prompt,
            spells,
        }
        setPrompt(newPrompt)
    }

    const updateSpell = (spellId: string, spell: Spell) => {
        const spells = prompt.spells.map((s) => (s.id === spell.id ? spell : s))
        updateSpells(spells)
    }

    const updateSpellContent = (spellId: string, content: string) => {
        const spells = prompt.spells.map((spell) => {
            if (spell.id === spellId) {
                return {
                    ...spell,
                    content,
                }
            }
            return spell
        })
        updateSpells(spells)
    }

    const updateSpellEnabled = (spellId: string, enabled: boolean) => {
        const spells = prompt.spells.map((spell) => {
            if (spell.id === spellId) {
                return {
                    ...spell,
                    enabled,
                }
            }
            return spell
        })
        updateSpells(spells)
    }

    const moveSpell = (activeId: string | number, overId?: string | number) => {
        const activeIndex = prompt.spells.findIndex((s) => s.id === activeId)
        const overIndex = prompt.spells.findIndex((s) => s.id === overId)
        const newSpells = arrayMove(prompt.spells, activeIndex, overIndex)

        updateSpells(newSpells)
    }

    const updateSpellEnhancement = (spellId: string, enhance: number) => {
        const spell = prompt.spells.find((s) => s.id === spellId)
        if (spell) {
            const newSpell = {
                ...spell,
                enhancement: enhance,
            }
            updateSpell(spellId, newSpell)
        }
    }

    const insertEmptySpell = (after: string) => {
        const newSpell: Spell = Preset.EmptySpell()

        const newSpells = prompt.spells.map((spell, i) => {
            if (spell.id === after) {
                return [spell, newSpell]
            }
            return spell
        })

        updateSpells(newSpells.flat())
    }

    const appendEmptySpell = () => {
        const newSpell: Spell = Preset.EmptySpell()

        const length = prompt.spells.length

        updateSpells([...prompt.spells, newSpell])
    }

    const appendSpell = (spell: Spell) => {
        updateSpells([...prompt.spells, { ...spell, id: generateRandomId() }])
    }

    const appendSpells = (spells: Spell[]) => {
        updateSpells([...prompt.spells, ...spells.map((s) => ({ ...s, id: generateRandomId() }))])
    }

    const deleteSpell = (spellId: string) => {
        const newSpells = prompt.spells.filter((spell) => spell.id !== spellId)
        updateSpells(newSpells)
    }

    const swapSpellsPrevOrNext = (spellId: string, prev: boolean) => {
        const spells = prompt.spells
        const index = spells.findIndex((s) => s.id === spellId)
        const newIndex = prev ? index - 1 : index + 1
        if (newIndex < 0 || newIndex >= spells.length) {
            return
        }
        const newSpells = arrayMove(spells, index, newIndex)
        updateSpells(newSpells)
    }

    const updatePromptTitle = (title: string) => {
        const newPrompt = {
            ...prompt,
            title,
        }
        setPrompt(newPrompt)
    }

    const focusWithSpellId = (spellId: string) => {
        const input = document.getElementById(spellId)
        if (input) {
            input.focus()
        } else {
            console.error("Cannot find input with id", spellId)
        }
    }

    const focusWithIndex = (index: number) => {
        console.log("prompt", prompt)
        const spell = prompt.spells[index]
        if (spell) {
            const input = document.getElementById(spell.id)
            if (input) {
                input.focus()
            } else {
                console.error("Cannot find input with id", spell.id)
            }
        } else {
            console.error("Cannot find spell with index", index)
        }
    }

    return {
        prompt,
        compiled,
        setPrompt,
        updateSpells,
        updateSpellContent,
        updateSpellEnabled,
        moveSpell,
        updateSpellEnhancement,
        insertEmptySpell,
        appendEmptySpell,
        appendSpell,
        appendSpells,
        deleteSpell,
        swapSpellsPrevOrNext,
        updatePromptTitle,
        focusWithSpellId,
        focusWithIndex,
    }
}
