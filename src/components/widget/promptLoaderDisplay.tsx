import { Box, HStack, Text } from "@chakra-ui/react"
import { useLocale } from "../../hooks/useLocale"
import { NAIMetaInfo } from "../../utils/exif"
import PromptDisplay from "./promptDisplay"
import SamplingAlgoDisplay from "./samplingDisplay"
import ValueDisplay from "./valueDisplay"

interface Props {
    metaInfo: NAIMetaInfo
    noSaveButton?: boolean
}

const PromptLoaderDisplay = ({ metaInfo, noSaveButton = false }: Props) => {
    const { t } = useLocale()
    return (
        <Box p={"2"}>
            {/* ポジティブプロンプト */}
            <PromptDisplay {...metaInfo.positive} noSaveButton={noSaveButton} />

            {/* ネガティブプロンプト */}
            <PromptDisplay {...metaInfo.negative} noSaveButton={noSaveButton} />

            {/* シード */}
            <ValueDisplay title={t.SEED} value={metaInfo.seed.toString()} />

            <HStack>
                {/* ステップ */}
                <ValueDisplay title={t.STEPS} value={metaInfo.steps.toString()} />
                {/* スケール */}
                <ValueDisplay title={t.SCALE} value={metaInfo.scale.toString()} />
            </HStack>

            {/* サンプリングアルゴリズム */}
            <SamplingAlgoDisplay algo={metaInfo.samplingAlgorithm} />
        </Box>
    )
}

export default PromptLoaderDisplay
