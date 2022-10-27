export type PromptType = "positive" | "negative"

export interface Prompt {
    id: string
    type: PromptType
    title: string
    spells: Spell[]
}

export interface NegativePromptPreset extends Prompt {
    removable: boolean
}

export interface Spell {
    text: string
    enhancement: number
    enabled: boolean
    children: Spell[]
}
