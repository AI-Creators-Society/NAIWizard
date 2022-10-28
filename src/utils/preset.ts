import { Prompt, Spell } from "../types/prompt"
import { PromptCore } from "./db"
import { generateRandomId } from "./random"

export class Preset {
    static readonly EmptyPositivePrompt: PromptCore = {
        title: "",
        type: "positive",
        spells: [],
    }

    static readonly EmptyNegativePrompt: PromptCore = {
        title: "",
        type: "negative",
        spells: [],
    }

    static readonly EmptySpell = (): Spell => {
        return {
            id: generateRandomId(),
            content: "",
            enabled: true,
            enhancement: 0,
            parentId: "",
        }
    }
}
