export type PromptType = "positive" | "negative"

export interface PromptCore {
    type: PromptType
    title: string
    spells: SpellCore[]
}

export interface SpellCore {
    content: string
    enhancement: number
    enabled: boolean
    parentId: string
}

export interface Prompt extends Omit<PromptCore, "spells"> {
    id?: number
    spells: Spell[]
}
export interface Spell extends SpellCore {
    id: string
}
