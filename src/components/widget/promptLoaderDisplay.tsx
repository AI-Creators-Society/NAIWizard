import { Box, Text } from "@chakra-ui/react"
import { useLocale } from "../../hooks/useLocale"
import { NAIMetaInfo } from "../../utils/exif"
import PromptDisplay from "./promptDisplay"

interface Props {
    metaInfo: NAIMetaInfo
}

const PromptLoaderDisplay = ({ metaInfo }: Props) => {
    const { t } = useLocale()
    return (
        <Box p={"2"}>
            <PromptDisplay {...metaInfo.positive} />

            <PromptDisplay {...metaInfo.negative} />
        </Box>
    )
}

export default PromptLoaderDisplay
