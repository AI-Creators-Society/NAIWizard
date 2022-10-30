import { Box, HStack, Text } from "@chakra-ui/react"
import { useLocale } from "../../hooks/useLocale"
import { NAIMetaInfo } from "../../utils/exif"
import PromptDisplay from "./promptDisplay"
import ValueDisplay from "./valueDisplay"

interface Props {
    metaInfo: NAIMetaInfo
}

const PromptLoaderDisplay = ({ metaInfo }: Props) => {
    const { t } = useLocale()
    return (
        <Box p={"2"}>
            {/* ポジティブプロンプト */}
            <PromptDisplay {...metaInfo.positive} />

            {/* ネガティブプロンプト */}
            <PromptDisplay {...metaInfo.negative} />

            {/* シード */}
            <ValueDisplay title={t.SEED} value={metaInfo.seed.toString()} />

            <HStack>
                {/* ステップ */}
                <ValueDisplay title={t.STEPS} value={metaInfo.steps.toString()} />
                {/* スケール */}
                <ValueDisplay title={t.SCALE} value={metaInfo.scale.toString()} />
            </HStack>
        </Box>
    )
}

export default PromptLoaderDisplay
