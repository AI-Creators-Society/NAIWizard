import Dexie, { Table, liveQuery } from "dexie"
import { useLiveQuery } from "dexie-react-hooks"
import { Prompt, PromptCore } from "../types/prompt"
import { generateRandomId } from "./random"

export class PomptDexie extends Dexie {
    prompts!: Table<PromptCore, number>

    constructor() {
        super("naiwizard_prompt")
        this.version(1).stores({
            prompts: "++id, title, type",
        })
    }
}

export class WizardDB {
    prompt = new PomptDexie()

    newPrompt = async (prompt: PromptCore): Promise<Prompt | undefined> => {
        try {
            const id = await this.prompt.prompts.add(prompt)
            return {
                ...prompt,
                id,
                spells: prompt.spells.map((spell) => ({
                    ...spell,
                    id: generateRandomId(),
                })),
            }
        } catch (error) {
            console.log("WizardDB.newPositivePrompt error", error)
        }
    }

    getPositivePrompts = liveQuery(async () => {
        return await this.prompt.prompts.where("type").equals("positive").toArray()
    })

    getNegativePrompts = liveQuery(async () => {
        return await this.prompt.prompts.where("type").equals("negative").toArray()
    })

    deletePrompt = async (id: number): Promise<void> => {
        try {
            await this.prompt.prompts.delete(id)
        } catch (error) {
            console.log("WizardDB.deletePrompt error", error)
        }
    }
}
