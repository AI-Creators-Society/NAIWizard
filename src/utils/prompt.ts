import { PromptCore, Spell, SpellCore } from "../types/prompt"
import { Preset } from "./preset"

export const compileSpells = (spells: Spell[]) => {
    return spells
        .filter((spell) => spell.enabled)
        .map((spell) => {
            const { content, enhancement } = spell
            const enhancedContent = enhance(content, enhancement)
            return enhancedContent
        })
        .join(", ")
}

const enhance = (content: string, enhancement: number) => {
    if (enhancement === 0) {
        return content
    }

    const start = enhancement > 0 ? "{" : "["
    const end = enhancement > 0 ? "}" : "]"
    const absEnhancement = Math.abs(enhancement)
    const enhancedContent = start.repeat(absEnhancement) + content + end.repeat(absEnhancement)
    return enhancedContent
}

const simpleParsePrompt = (prompt: string, enhancement: number): SpellCore[] => {
    return prompt
        .split(",")
        .filter((word) => {
            return word.trim() !== ""
        })
        .map((word) => {
            return {
                content: word.trim(),
                enabled: true,
                enhancement,
                parentId: "",
            }
        })
}

const parsePrompt = (prompt: string, enhancement: number): SpellCore[] => {
    const plusIndexStart = prompt.indexOf("{")
    if (plusIndexStart !== -1) {
        const before = prompt.slice(0, plusIndexStart)
        const after = prompt.slice(plusIndexStart + 1)
        return [...parsePrompt(before, enhancement), ...parsePrompt(after, enhancement + 1)]
    }

    const plusIndexEnd = prompt.indexOf("}")
    if (plusIndexEnd !== -1) {
        const before = prompt.slice(0, plusIndexEnd)
        const after = prompt.slice(plusIndexEnd + 1)
        return [...simpleParsePrompt(before, enhancement), ...parsePrompt(after, enhancement - 1)]
    }

    const minusIndexStart = prompt.indexOf("[")
    if (minusIndexStart !== -1) {
        const before = prompt.slice(0, minusIndexStart)
        const after = prompt.slice(minusIndexStart + 1)
        return [...parsePrompt(before, enhancement), ...parsePrompt(after, enhancement - 1)]
    }

    const minusIndexEnd = prompt.indexOf("]")
    if (minusIndexEnd !== -1) {
        const before = prompt.slice(0, minusIndexEnd)
        const after = prompt.slice(minusIndexEnd + 1)
        return [...simpleParsePrompt(before, enhancement), ...parsePrompt(after, enhancement + 1)]
    }

    return simpleParsePrompt(prompt, enhancement)
}

export const parsePositivePrompt = (prompt: string, title?: string): PromptCore => {
    return {
        title: title || "Untitled Positive Prompt",
        type: "positive",
        spells: parsePrompt(prompt, 0),
    }
}

export const parseNegativePrompt = (prompt: string, title?: string): PromptCore => {
    switch (prompt) {
        case Preset.CompiledNone: {
            return Preset.None
        }
        case Preset.CompiledLowQuality: {
            return Preset.LowQuality
        }
        case Preset.CompiledLowQualityPlusBadAnatomy: {
            return Preset.LowQualityPlusBadAnatomy
        }
        default: {
            return {
                title: title || "Untitled Negative Prompt",
                type: "negative",
                spells: parsePrompt(prompt, 0),
            }
        }
    }
}
