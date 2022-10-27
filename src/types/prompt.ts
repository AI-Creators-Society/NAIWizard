export interface Prompt {
    id: string
    title: string
    spells: Spell[]
}

export interface Spell {
    text: string
    enhancement: number
    enabled: boolean
    children: Spell[]
}
