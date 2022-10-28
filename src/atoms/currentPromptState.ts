import { Prompt, Spell } from "../types/prompt"
import { generateRandomId } from "../utils/random"
import { atom, useRecoilState } from "recoil"
import { PromptCompiler } from "../utils/prompt"

const currentPromptStateKey = "currentPromptState"

export interface CurrentPromptState {
    prompt: Prompt
    compiled: string
}

const initialPositivePrompt: Prompt = {
    id: generateRandomId(),
    title: "",
    type: "positive",
    spells: [
        {
            id: generateRandomId(),
            content: "1girl",
            enabled: true,
            enhancement: 0,
            parentId: "",
        },
        {
            id: generateRandomId(),
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
            id: generateRandomId(),
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
        const newSpells = prompt.spells.map((s) => {
            if (s.id === spellId) {
                return spell
            }
            return s
        })
        updateSpells(newSpells)
    }

    return { prompt, compiled, setPrompt, updateSpells, updateSpell }
}
