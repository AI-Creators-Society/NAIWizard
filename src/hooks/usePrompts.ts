import { useEffect, useState } from "react"
import { useWizardState } from "../atoms/wizardState"
import { Prompt, PromptCore } from "../types/prompt"
import { WizardDB } from "../utils/db"
import { generateRandomId } from "../utils/random"

export const usePrompts = () => {
    const db = new WizardDB()
    const { wizardState } = useWizardState()
    const [prompts, setPrompts] = useState<Prompt[]>([])

    const deletePrompt = async (id: number) => {
        await db.deletePrompt(id)
    }

    const createPrompt = async (prompt: PromptCore) => {
        await db.newPrompt(prompt)
    }

    const updateOrCreatePrompt = async (prompt: Prompt) => {
        if (prompts.map((p) => p.id).includes(prompt.id)) {
            await db.prompt.prompts.update(prompt.id!, prompt)
        } else {
            await createPrompt(prompt)
        }
    }

    useEffect(() => {
        const obserbable = (() => {
            switch (wizardState.type) {
                case "positive": {
                    return db.getPositivePrompts
                }
                case "negative": {
                    return db.getNegativePrompts
                }
            }
        })()

        const subscription = obserbable.subscribe(
            (prompts) =>
                setPrompts(
                    prompts.map((prompt) => {
                        return {
                            ...prompt,
                            spells: prompt.spells.map((spell) => ({
                                ...spell,
                                id: generateRandomId(),
                            })),
                        }
                    })
                ),
            (error) => setPrompts([])
        )

        return () => {
            subscription.unsubscribe()
            setPrompts([])
        }
    }, [wizardState])

    return {
        prompts,
        deletePrompt,
        createPrompt,
        updateOrCreatePrompt,
    }
}
