import { Box, Button, HStack, Text } from "@chakra-ui/react"
import { useMemo } from "react"
import { NAIMetaInfo } from "../../utils/exif"
import CopyIconButton from "../common/copyIconButton"

interface Props {
    metaInfo: NAIMetaInfo
}

const CopyToShareBox = ({ metaInfo }: Props) => {
    const prompt = useMemo(() => {
        const parameters: Record<string, string> = {
            Positive: metaInfo.positive.original.compiled,
            Negative: metaInfo.negative.original.compiled,
            Seed: metaInfo.seed.toString(),
            Steps: metaInfo.steps.toString(),
            Scale: metaInfo.scale.toString(),
            "Sampling Algorithm": metaInfo.samplingAlgorithm,
        }

        return Object.entries(parameters)
            .map(([key, value]) => `- ${key}\n${value}`)
            .join("\r\n")
    }, [metaInfo])

    return (
        <Box my={"2"}>
            <Text fontWeight={"semibold"}>まとめてコピー</Text>
            <HStack my={"1"}>
                <Text>Twitter の ALT に載せる用にすべての情報をまとめてコピーできます。</Text>
                <CopyIconButton
                    w={"16"}
                    fontSize={"xl"}
                    variant={"outline"}
                    colorScheme={"brand"}
                    value={prompt}
                    brand={false}
                />
            </HStack>
        </Box>
    )
}

export default CopyToShareBox
