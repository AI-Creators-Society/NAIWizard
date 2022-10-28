import { useEffect, useState } from "react"
import { useWizardState } from "../atoms/wizardState"
import { Prompt } from "../types/prompt"
import { WizardDB } from "../utils/db"

export const usePrompts = () => {
    const db = new WizardDB()
    const { wizardState } = useWizardState()
    const [prompts, setPrompts] = useState<Prompt[]>([])

    const deletePrompt = async (id: number) => {
        await db.deletePrompt(id)
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
            (prompts) => setPrompts(prompts),
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
    }
}
