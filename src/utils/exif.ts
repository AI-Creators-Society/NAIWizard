import { PromptCore } from "../types/prompt"
import {
    parseNegativePrompt,
    parsePositivePrompt,
    parseNegativePromptWithoutPreset,
    parsePositivePromptWithoutPreset,
    removePositivePreset,
    removeNegativePreset,
} from "./prompt"
import { loadPrompt, NAIPrompt, NAISamplingAlgorithm } from "prompt_loader/npm"

export interface NAIMetaInfo {
    positive: {
        original: {
            prompt: PromptCore
            compiled: string
        }
        addition: {
            prompt: PromptCore
            compiled: string
        }
    }
    negative: {
        original: {
            prompt: PromptCore
            compiled: string
        }
        addition: {
            prompt: PromptCore
            compiled: string
        }
    }
    size: {
        width: number
        height: number
    }
    seed: number
    steps: number
    scale: number
    strength: number
    noise: number
    samplingAlgorithm: NAISamplingAlgorithm
}

export const getNAIMetaInfo = async (file: File): Promise<NAIMetaInfo | undefined> => {
    try {
        const prompt = await loadPrompt(file)

        if (!prompt) {
            return undefined
        }
        console.log(JSON.stringify(prompt))

        // max length is 20
        const title = file.name.slice(0, 20)

        const metaInfo: NAIMetaInfo = {
            ...(prompt as NAIPrompt),
            positive: {
                original: {
                    prompt: parsePositivePrompt(prompt.positive, title),
                    compiled: prompt.positive,
                },
                addition: {
                    prompt: parsePositivePromptWithoutPreset(prompt.positive, title),
                    compiled: removePositivePreset(prompt.positive),
                },
            },
            negative: {
                original: {
                    prompt: parseNegativePrompt(prompt.negative, title),
                    compiled: prompt.negative,
                },
                addition: {
                    prompt: parseNegativePromptWithoutPreset(prompt.negative, title),
                    compiled: removeNegativePreset(prompt.negative),
                },
            },
        }

        return metaInfo
    } catch (error) {
        console.error(error)
        return undefined
    }
}
