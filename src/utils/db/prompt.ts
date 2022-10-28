import Dexie, { Table, liveQuery } from "dexie"
import { useLiveQuery } from "dexie-react-hooks"
import { Prompt } from "../../types/prompt"

export class PomptDexie extends Dexie {
    prompts!: Table<Prompt, number>
    // negative!: Table<Prompt, number>

    constructor() {
        super("naiwizard_prompt")
        this.version(1).stores({
            prompts: "++id, title, type", // Primary key and indexed props
            // negative: "++id, title, type",
        })
    }
}

export type PromptCore = Omit<Prompt, "id">

export class WizardDB {
    prompt = new PomptDexie()

    newPrompt = async (prompt: PromptCore): Promise<Prompt | undefined> => {
        try {
            const id = await this.prompt.prompts.add(prompt)
            return {
                ...prompt,
                id,
            }
        } catch (error) {
            console.log("WizardDB.newPositivePrompt error", error)
        }
    }

    getPositivePrompts = liveQuery(async () => {
        return await this.prompt.prompts.where("type").equals("positive").toArray()
    })

    // getPositivePrompts = async (): Promise<Prompt[]> => {
    //     try {
    //         return await this.prompt.prompts.where("type").equals("positive").toArray()
    //     } catch (error) {
    //         console.log("WizardDB.getPositivePrompts error", error)
    //         return []
    //     }
    // }

    getNegativePrompts = liveQuery(async () => {
        return await this.prompt.prompts.where("type").equals("negative").toArray()
    })

    // getNegativePrompts = async (): Promise<Prompt[]> => {
    //     try {
    //         return await this.prompt.prompts.where("type").equals("negative").toArray()
    //     } catch (error) {
    //         console.log("WizardDB.getNegativePrompts error", error)
    //         return []
    //     }
    // }

    deletePrompt = async (id: number): Promise<void> => {
        try {
            await this.prompt.prompts.delete(id)
        } catch (error) {
            console.log("WizardDB.deletePrompt error", error)
        }
    }
}
