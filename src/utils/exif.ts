import exifr from "exifr"
import { PromptCore } from "../types/prompt"
import { parseNegativePrompt, parsePositivePrompt } from "./prompt"

export type NAIExifTag = "Title" | "Description" | "Software" | "Source" | "Comment"
export type NAISamplingAlgorithm = "k_euler_ancestral" | "k_euler" | "k_lms" | "plms" | "ddim"
const NAISoftwareName = "NovelAI"

export interface NAIMetaInfo {
    positive: {
        prompt: PromptCore
        compiled: string
    }
    negative: {
        prompt: PromptCore
        compiled: string
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
    // const exif = await exifr.parse(file)
    // console.log(exif)
    return undefined
    // try {
    //     const exif = await exifr.parse(file)
    //     const software = exif.Software as string
    //     if (software !== NAISoftwareName) {
    //         return undefined
    //     }

    //     const comment: NAIMetaComment = JSON.parse(exif.Comment as string)

    //     const metaInfo: NAIMetaInfo = {
    //         positive: {
    //             prompt: parsePositivePrompt(exif.Description),
    //             compiled: exif.Description,
    //         },
    //         negative: {
    //             prompt: parseNegativePrompt(comment.uc),
    //             compiled: comment.uc,
    //         },
    //         size: {
    //             width: exif.ImageWidth,
    //             height: exif.ImageLength,
    //         },
    //         seed: comment.seed,
    //         steps: comment.steps,
    //         scale: comment.scale,
    //         strength: comment.strength,
    //         noise: comment.noise,
    //         samplingAlgorithm: comment.sampler as NAISamplingAlgorithm,
    //     }
    //     return metaInfo
    // } catch (error) {
    //     return undefined
    // }
}
