import { Box, Text } from "@chakra-ui/react"
import { NAISamplingAlgorithm } from "prompt_loader/npm"
import { useLocale } from "../../hooks/useLocale"
import BrandInput from "../common/brandInput"

interface Props {
    algo: NAISamplingAlgorithm
}

const SamplingAlgoDisplay = ({ algo }: Props) => {
    const { t } = useLocale()
    return (
        <Box my={"2"}>
            <Text fontWeight={"semibold"}>{t.SAMPLING_ALGORITHM}</Text>
            <BrandInput value={algo} my={"1"} />
        </Box>
    )
}

export default SamplingAlgoDisplay
