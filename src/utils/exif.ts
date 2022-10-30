import exifr from "exifr"
import { PromptCore } from "../types/prompt"
import {
    parseNegativePrompt,
    parsePositivePrompt,
    parseNegativePromptWithoutPreset,
    parsePositivePromptWithoutPreset,
    removePositivePreset,
    removeNegativePreset,
} from "./prompt"

export type NAIExifTag = "Title" | "Description" | "Software" | "Source" | "Comment"
export type NAISamplingAlgorithm = "k_euler_ancestral" | "k_euler" | "k_lms" | "plms" | "ddim"
const NAISoftwareName = "NovelAI"

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

export interface NAIMetaComment {
    steps: number
    sampler: string
    seed: number
    strength: number
    noise: number
    scale: number
    uc: string
}

export const getNAIMetaInfo = async (file: File): Promise<NAIMetaInfo | undefined> => {
    try {
        const exif = await exifr.parse(file)
        // console.log(exif)
        const software = exif.Software as string
        if (software !== NAISoftwareName) {
            return undefined
        }

        const comment: NAIMetaComment = JSON.parse(exif.Comment as string)

        // max length is 20
        const title = file.name.slice(0, 20)

        const metaInfo: NAIMetaInfo = {
            positive: {
                original: {
                    prompt: parsePositivePrompt(exif.Description, title),
                    compiled: exif.Description,
                },
                addition: {
                    prompt: parsePositivePromptWithoutPreset(exif.Description, title),
                    compiled: removePositivePreset(exif.Description),
                },
            },
            negative: {
                original: {
                    prompt: parseNegativePrompt(comment.uc, title),
                    compiled: comment.uc,
                },
                addition: {
                    prompt: parseNegativePromptWithoutPreset(comment.uc, title),
                    compiled: removeNegativePreset(comment.uc),
                },
            },
            size: {
                width: exif.ImageWidth,
                height: exif.ImageLength,
            },
            seed: comment.seed,
            steps: comment.steps,
            scale: comment.scale,
            strength: comment.strength,
            noise: comment.noise,
            samplingAlgorithm: comment.sampler as NAISamplingAlgorithm,
        }

        console.log("meta", metaInfo)
        return metaInfo
    } catch (error) {
        return undefined
    }
}
