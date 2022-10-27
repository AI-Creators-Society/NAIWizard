import { useState } from "react"
import { Prompt, Spell } from "../types/prompt"

const initialPositivePrompt: Prompt = {
    id: "",
    title: "",
    type: "positive",
    spells: [
        {
            id: 0,
            content: "1girl",
            enabled: true,
            enhancement: 0,
            children: [],
        },
        {
            id: 1,
            content: "kawaii",
            enabled: true,
            enhancement: 0,
            children: [],
        },
        {
            id: 2,
            content: "cowboy shot",
            enabled: true,
            enhancement: 0,
            children: [],
        },
        {
            id: 3,
            content: "looking at viewer",
            enabled: true,
            enhancement: 0,
            children: [],
        },
    ],
}

export const usePrompt = () => {
    const [prompt, setPrompt] = useState<Prompt>(initialPositivePrompt)

    const appendSpell = (spell: Spell) => {
        setPrompt({
            ...prompt,
            spells: [...prompt.spells, spell],
        })
    }

    const insertSpell = (spell: Spell, index: number) => {
        setPrompt({
            ...prompt,
            spells: [...prompt.spells.slice(0, index), spell, ...prompt.spells.slice(index)],
        })
    }

    const updateSpell = (spell: Spell, index: number) => {
        setPrompt({
            ...prompt,
            spells: [...prompt.spells.slice(0, index), spell, ...prompt.spells.slice(index + 1)],
        })
    }

    const loadPrompt = (prompt: Prompt) => {
        setPrompt(prompt)
    }

    return { prompt, loadPrompt, appendSpell, insertSpell, updateSpell }
}
