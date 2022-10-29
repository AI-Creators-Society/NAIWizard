import { Box, Button, Center, Image, Input, Spacer, Text, useBoolean } from "@chakra-ui/react"
import { useLocale } from "../../hooks/useLocale"
import { useDropzone } from "react-dropzone"
import { useCallback, useEffect, useState } from "react"
import { NAIMetaInfo } from "../../utils/exif"
import { useImageMeta } from "../../hooks/useImageMeta"
import { Icon } from "@iconify/react"
import PromptLoaderDisplay from "./promptLoaderDisplay"

const PromptLoaderWidget = () => {
    const { t } = useLocale()
    const [hovering, setHovering] = useBoolean(false)

    const onDrop = useCallback((files: File[]) => {
        console.log("files:", files)
    }, [])

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
    })

    const [image, setImage] = useState<File | undefined>(undefined)
    const { imageMetaInfo, getImageMetaInfo } = useImageMeta()

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            setImage(acceptedFiles[0])
        }
    }, [acceptedFiles])

    useEffect(() => {
        if (image) {
            getImageMetaInfo(image)
        }
    }, [image])

    return (
        <Box my={"2"}>
            <Text p={"2"} fontWeight={"semibold"}>
                {t.PROMPT_LOADER}
            </Text>

            {/* アップローダー/サムネ */}

            <Center
                position={"relative"}
                w={"full"}
                minH={"32"}
                p={"2"}
                backgroundColor={"background.main"}
                border={"1px"}
                borderColor={hovering ? "gray.500" : "transparent"}
                rounded={"md"}
                onMouseEnter={() => {
                    setHovering.on()
                }}
                onMouseLeave={() => {
                    setHovering.off()
                }}
                cursor={"pointer"}
                {...getRootProps()}
            >
                <>
                    <input {...getInputProps()} />

                    {image && <Image maxH={"40"} fit={"cover"} src={URL.createObjectURL(image)} alt={image.name} />}

                    <Center position={"absolute"} h={"full"}>
                        {isDragActive ? (
                            <Text>{t.PROMPT_LOADER_DND}</Text>
                        ) : image ? null : (
                            <Text decoration={hovering ? "underline" : ""}>{t.PROMPT_LOADER_UPLOAD}</Text>
                        )}
                    </Center>

                    <Box position={"absolute"} top={"0"} left={"0"}></Box>
                </>
            </Center>

            {/* 情報 */}
            {imageMetaInfo && <PromptLoaderDisplay metaInfo={imageMetaInfo} />}
        </Box>
    )
}

export default PromptLoaderWidget
