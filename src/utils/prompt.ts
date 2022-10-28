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
        if (enhancement === 0) {
            return content
        }

        const start = enhancement > 0 ? "{" : "["
        const end = enhancement > 0 ? "}" : "]"
        const absEnhancement = Math.abs(enhancement)
        const enhancedContent = start.repeat(absEnhancement) + content + end.repeat(absEnhancement)
        return enhancedContent
    }
}
