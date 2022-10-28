import Dexie, { Table } from "dexie"
import { Prompt } from "../../types/prompt"

export class PomptDexie extends Dexie {
    positivePropmts!: Table<Prompt, number>
    negativePropmts!: Table<Prompt, number>

    constructor() {
        super("naiwizard_prompt")
        this.version(1).stores({
            positivePropmts: "++id, title", // Primary key and indexed props
            negativePropmts: "++id, title",
        })
    }
}

export type PromptCore = Omit<Prompt, "id">

export class WizardDB {
    db = new PomptDexie()

    newPositivePrompt = async (prompt: PromptCore): Promise<Prompt | undefined> => {
        try {
            const id = await this.db.positivePropmts.add(prompt)
            return {
                ...prompt,
                id,
            }
        } catch (error) {
            console.log("WizardDB.newPositivePrompt error", error)
        }
    }
}
