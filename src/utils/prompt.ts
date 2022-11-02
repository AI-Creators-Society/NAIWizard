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

const isolateChar = (text: string, char: string): string[] => {
    return text.split(char).map((word) => {
        if (word === "") {
            return char
        } else {
            return word.trim()
        }
    })
}

const removeFirstComma = (text: string) => {
    return text.replace(/^,/, "").trim()
}

const removePreset = (prompt: string, preset: string): string => {
    return removeFirstComma(prompt.replace(new RegExp(`^${preset}`), ""))
}

export const parsePrompt = (prompt: string): SpellCore[] => {
    let plus = 0
    let minus = 0
    const parsed = prompt.split(",").flatMap((word) => {
        const content = word.trim()

        const isolated = isolateChar(content, "{").flatMap((word) => {
            return isolateChar(word, "}").flatMap((word) => {
                return isolateChar(word, "[").flatMap((word) => {
                    return isolateChar(word, "]")
                })
            })
        })

        console.log("isolated", isolated)

        const result = isolated.map((word) => {
            if (word === "{") {
                plus += 1
                return ""
            } else if (word === "}") {
                plus = Math.max(0, plus - 1)
                return ""
            } else if (word === "[") {
                minus += 1
                return ""
            } else if (word === "]") {
                minus = Math.max(0, minus - 1)
                return ""
            } else {
                return {
                    content: word,
                    enabled: true,
                    enhancement: plus - minus,
                    parentId: "",
                }
            }
        })

        return result.filter((word): word is SpellCore => {
            return word !== ""
        })
    })

    return parsed
}

export const parsePositivePrompt = (prompt: string, title?: string): PromptCore => {
    return {
        title: title || "Untitled Positive Prompt",
        type: "positive",
        spells: parsePrompt(prompt),
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
                spells: parsePrompt(prompt),
            }
        }
    }
}

export const parsePositivePromptWithoutPreset = (prompt: string, title?: string): PromptCore => {
    const additionalPrompt = removePreset(prompt, Preset.CompiledQualityTags)
    console.log("additionalPrompt", additionalPrompt)
    return {
        title: title || "Untitled Positive Prompt",
        type: "positive",
        spells: parsePrompt(additionalPrompt),
    }
}

export const parseNegativePromptWithoutPreset = (prompt: string, title?: string): PromptCore => {
    if (prompt.startsWith(Preset.CompiledLowQualityPlusBadAnatomy)) {
        const additionalPrompt = removePreset(prompt, Preset.CompiledLowQualityPlusBadAnatomy)
        return {
            title: title || "Untitled Negative Prompt",
            type: "negative",
            spells: parsePrompt(additionalPrompt),
        }
    } else if (prompt.startsWith(Preset.CompiledLowQuality)) {
        const additionalPrompt = removePreset(prompt, Preset.CompiledLowQuality)
        return {
            title: title || "Untitled Negative Prompt",
            type: "negative",
            spells: parsePrompt(additionalPrompt),
        }
    } else if (prompt.startsWith(Preset.CompiledNone)) {
        const additionalPrompt = removePreset(prompt, Preset.CompiledNone)
        return {
            title: title || "Untitled Negative Prompt",
            type: "negative",
            spells: parsePrompt(additionalPrompt),
        }
    } else {
        return {
            title: title || "Untitled Negative Prompt",
            type: "negative",
            spells: parsePrompt(prompt),
        }
    }
}

export const removePositivePreset = (prompt: string) => {
    if (prompt.startsWith(Preset.CompiledQualityTags)) {
        const removed = removePreset(prompt, Preset.CompiledQualityTags)
        return removed
    } else {
        return prompt
    }
}

export const removeNegativePreset = (prompt: string) => {
    if (prompt.startsWith(Preset.CompiledLowQualityPlusBadAnatomy)) {
        const removed = removePreset(prompt, Preset.CompiledLowQualityPlusBadAnatomy)
        return removed
    } else if (prompt.startsWith(Preset.CompiledLowQuality)) {
        const removed = removePreset(prompt, Preset.CompiledLowQuality)
        return removed
    } else if (prompt.startsWith(Preset.CompiledNone)) {
        const removed = removePreset(prompt, Preset.CompiledNone)
        return removed
    } else {
        return prompt
    }
}
