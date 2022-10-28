export type PromptType = "positive" | "negative"

export interface Prompt {
    id?: number
    type: PromptType
    title: string
    spells: Spell[]
}

export interface NegativePromptPreset extends Prompt {
    removable: boolean
}

export interface Spell {
    id: string
    content: string
    enhancement: number
    enabled: boolean
    parentId: string
}
