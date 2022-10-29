import { Box, Button, Center, Image, Input, Text, useBoolean } from "@chakra-ui/react"
import { useLocale } from "../../hooks/useLocale"
import { useDropzone } from "react-dropzone"
import { useCallback, useEffect, useState } from "react"
import { getNAIMetaInfo, NAIMetaInfo } from "../../utils/exif"

const PromptLoaderWidget = () => {
    const { t } = useLocale()
    const [hovering, setHovering] = useBoolean(false)

    const onDrop = useCallback((files: File[]) => {
        // Do something with the files
        console.log("files:", files)
    }, [])

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
    })

    const [image, setImage] = useState<File | undefined>(undefined)
    const [imageMetaInfo, setImageMetaInfo] = useState<NAIMetaInfo | undefined>(undefined)

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            setImage(acceptedFiles[0])
        }
    }, [acceptedFiles])

    useEffect(() => {
        if (image) {
            getNAIMetaInfo(image).then((metaInfo) => {
                setImageMetaInfo(metaInfo)
            })
        }
    }, [image])

    return (
        <Box my={"2"}>
            <Text p={"2"} fontWeight={"semibold"}>
                {t.PROMPT_LOADER}
            </Text>

            {/* アップローダー/サムネ */}

            {/* {image ? (
                <Center w={"full"} p={"2"} backgroundColor={"background.main"} rounded={"md"} overflow={"clip"}>
                    <Image maxH={"40"} fit={"cover"} src={URL.createObjectURL(image)} alt={image.name} />
                </Center>
            ) : ( */}
            <Center
                w={"full"}
                minH={"32"}
                p={"2"}
                backgroundColor={"background.main"}
                border={hovering ? "1px" : ""}
                borderColor={"gray.500"}
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
                <input {...getInputProps()} />

                {image && <Image maxH={"40"} fit={"cover"} src={URL.createObjectURL(image)} alt={image.name} />}

                <Center position={"absolute"} h={"full"}>
                    {isDragActive ? (
                        <Center h={"full"}>
                            <Text>{t.PROMPT_LOADER_DND}</Text>
                        </Center>
                    ) : (
                        <Center h={"full"}>
                            <Text decoration={hovering ? "underline" : ""}>{t.PROMPT_LOADER_UPLOAD}</Text>
                        </Center>
                    )}
                </Center>
            </Center>
            {/* )} */}

            {/* 情報 */}
            {imageMetaInfo && (
                <Box>
                    <Text>Positive</Text>
                    {imageMetaInfo.positive.compiled}

                    <Text>Negative</Text>
                    {imageMetaInfo.negative.compiled}
                </Box>
            )}
        </Box>
    )
}

export default PromptLoaderWidget
