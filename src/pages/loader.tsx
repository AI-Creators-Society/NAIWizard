import { Box, Center, Container, Heading, HStack, Image, Text, useBoolean, VStack } from "@chakra-ui/react"
import { useLocale } from "../hooks/useLocale"
import { useDropzone } from "react-dropzone"
import { useCallback, useEffect, useState } from "react"
import { useImageMeta } from "../hooks/useImageMeta"
import PromptLoaderDisplay from "../components/widget/promptLoaderDisplay"
import Head from "next/head"
import headData from "../utils/headData"

const Page = () => {
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
        <>
            <Head>
                <title>{`呪文解析 | ${headData.title}`}</title>
                <meta name="og:title" content={`呪文解析 | ${headData.title}`} />
            </Head>
            <Container maxW={"container.sm"} h={"full"} backgroundColor={"background.secondary"} overflowY={"scroll"}>
                <Box m={["0", "8"]} py={"4"} px={["0", "4", "8"]} h={"full"}>
                    <Heading my={"4"} fontWeight={"semibold"}>
                        {t.PROMPT_LOADER}
                    </Heading>

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

                            {image && (
                                <Image maxH={"40"} fit={"cover"} src={URL.createObjectURL(image)} alt={image.name} />
                            )}

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
                    {imageMetaInfo ? <PromptLoaderDisplay metaInfo={imageMetaInfo} noSaveButton={true} /> : <></>}

                    {/* 説明文 */}
                    <Box my={"4"}>
                        <Heading size={"lg"}>説明</Heading>
                        <Text my={"2"}>
                            NovelAI を使って生成された画像からプロンプトを取得することができます。
                            画像はどこにもアップロードされず、すべてローカルで処理されます。
                        </Text>
                        <Text my={"2"}>
                            「プリセットを含める」のチェックを入れると、実際に入力したプロンプトに加えてクオリティタグやネガティブプロンプトのプリセットの内容も表示されます。
                            {"<なし>"} と表示されている場合は、何も入力されなかったことを表します。
                        </Text>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Page
