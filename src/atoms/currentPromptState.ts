import { Prompt, Spell } from "../types/prompt"
import { generateRandomId } from "../utils/random"
import { atom, useRecoilState } from "recoil"
import { PromptCompiler } from "../utils/prompt"
import { arrayMove } from "@dnd-kit/sortable"
import { useEffect } from "react"

const currentPromptStateKey = "currentPromptState"

export interface CurrentPromptState {
    prompt: Prompt
    compiled: string
}

const initialPositivePrompt: Prompt = {
    id: "1234",
    title: "",
    type: "positive",
    spells: [
        {
            id: "1111",
            content: "1girl",
            enabled: true,
            enhancement: 0,
            parentId: "",
        },
        {
            id: "2222",
            content: "kawaii",
            enabled: true,
            enhancement: 0,
            parentId: "",
        },
        {
            id: "3456",
            content: "cowboy shot",
            enabled: true,
            enhancement: 0,
            parentId: "",
        },
        {
            id: "7890",
            content: "looking at viewer",
            enabled: true,
            enhancement: 0,
            parentId: "3456",
        },
    ],
}

export const initialCurrentPromptState: CurrentPromptState = {
    prompt: initialPositivePrompt,
    compiled: "",
}

export const currentPromptStateAtom = atom<CurrentPromptState>({
    key: currentPromptStateKey,
    default: initialCurrentPromptState,
})

export const useCurrentPromptState = () => {
    const [currentPromptState, setCurrentPromptState] = useRecoilState(currentPromptStateAtom)
    const { prompt, compiled } = currentPromptState
    const compiler = new PromptCompiler()

    useEffect(() => {
        const compiled = compiler.compile(prompt.spells)
        setCurrentPromptState((state) => ({ ...state, compiled }))
    }, [])

    const setPrompt = (prompt: Prompt) => {
        const newCompiled = compiler.compile(prompt.spells)
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

    const updateSpellEnhance = (spellId: string, enhance: number) => {
        const spell = prompt.spells.find((s) => s.id === spellId)
        if (spell) {
            const newSpell = {
                ...spell,
                enhancement: enhance,
            }
            updateSpell(spellId, newSpell)
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
        updateSpellEnhance,
    }
}
