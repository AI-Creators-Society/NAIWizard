import { Spell } from "../types/prompt"

export class PromptCompiler {
    compile(spells: Spell[]) {
        return spells
            .filter((spell) => spell.enabled)
            .map((spell) => {
                const { content, enhancement } = spell
                const enhancedContent = this.enhance(content, enhancement)
                return enhancedContent
            })
            .join(", ")
    }

    enhance(content: string, enhancement: number) {
        // if enhancement is 0, return content
        // if enhancement is more than 0, return content with enclose in {} for each enhancement
        // if enhancement is less than 0, return content with enclose in [] for each enhancement

        if (enhancement === 0) {
            return content
        }

        const enclose = enhancement > 0 ? "{}" : "[]"
        const absEnhancement = Math.abs(enhancement)
        const enhancedContent = enclose.repeat(absEnhancement) + content + enclose.repeat(absEnhancement)
        return enhancedContent
    }
}
