import { Prompt, PromptCore, Spell } from "../types/prompt"
import { generateRandomId } from "./random"

export class Preset {
    static readonly EmptyPositivePrompt: PromptCore = {
        title: "",
        type: "positive",
        spells: [],
    }

    static readonly EmptyNegativePrompt: PromptCore = {
        title: "",
        type: "negative",
        spells: [],
    }

    static readonly EmptySpell = (): Spell => {
        return {
            id: generateRandomId(),
            content: "",
            enabled: true,
            enhancement: 0,
            parentId: "",
        }
    }

    static readonly NSFW = "nsfw"
    static readonly CompiledLowQuality =
        "nsfw, lowres, text, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"
    static readonly CompiledLowQualityPlusBadAnatomy =
        "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"

    static readonly CompiledNone = "lowres"

    static readonly None: PromptCore = {
        title: "None",
        type: "negative",
        spells: [
            {
                content: Preset.CompiledNone,
                enabled: true,
                enhancement: 0,
                parentId: "",
            },
        ],
    }

    static readonly LowQuality: PromptCore = (() => {
        const words = Preset.CompiledLowQuality.split(", ")
        return {
            title: "Low Quality",
            type: "negative",
            spells: words.map((word) => {
                return {
                    content: word,
                    enabled: true,
                    enhancement: 0,
                    parentId: "",
                }
            }),
        }
    })()

    static readonly LowQualityPlusBadAnatomy: PromptCore = (() => {
        const words = Preset.CompiledLowQualityPlusBadAnatomy.split(", ")
        return {
            title: "Low Quality + Bad Anatomy",
            type: "negative",
            spells: words.map((word) => {
                return {
                    content: word,
                    enabled: true,
                    enhancement: 0,
                    parentId: "",
                }
            }),
        }
    })()

    static readonly InitialPositivePrompt = (): Prompt => {
        return {
            id: 0,
            title: "",
            type: "positive",
            spells: [
                {
                    id: generateRandomId(),
                    content: "1girl",
                    enabled: true,
                    enhancement: 0,
                    parentId: "",
                },
                {
                    id: generateRandomId(),
                    content: "kawaii",
                    enabled: true,
                    enhancement: 0,
                    parentId: "",
                },
                {
                    id: generateRandomId(),
                    content: "cowboy shot",
                    enabled: true,
                    enhancement: 0,
                    parentId: "",
                },
                {
                    id: generateRandomId(),
                    content: "looking at viewer",
                    enabled: true,
                    enhancement: 0,
                    parentId: "3456",
                },
            ],
        }
    }

    static readonly CompiledQualityTags = "masterpiece, best quality"
}
