import { useState } from "react"
import { getNAIMetaInfo, NAIMetaInfo } from "../utils/exif"

export const useImageMeta = () => {
    const [imageMetaInfo, setImageMetaInfo] = useState<NAIMetaInfo | undefined>(undefined)

    const getImageMetaInfo = async (file: File) => {
        const metaInfo = await getNAIMetaInfo(file)
        setImageMetaInfo(metaInfo)
    }

    return {
        imageMetaInfo,
        getImageMetaInfo,
    }
}
