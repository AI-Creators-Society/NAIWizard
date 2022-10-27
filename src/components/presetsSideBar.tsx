import { Box, Text } from "@chakra-ui/react"
import { useWizardState } from "../atoms/wizardState"
import { useLocale } from "../hooks/useLocale"
import { Prompt } from "../types/prompt"
import SecondaryBox from "./common/secondaryBox"
import PresetCard from "./presetCard"

interface Props {
    prompts: Prompt[]
}

const PresetsSideBar = ({ prompts }: Props) => {
    const { wizardState } = useWizardState()
    const { t } = useLocale()

    return (
        <SecondaryBox w={["sm", "md"]}>
            <Text p={"4"} fontWeight={"bold"}>
                {wizardState.type === "positive" ? t.POSITIVE_PROMPT : t.NEGATIVE_PROMPT}
            </Text>

            {/* プロンプトプリセット一覧 */}
            {prompts.map((prompt) => (
                <Box key={prompt.id} p={"2"}>
                    <PresetCard prompt={prompt} />
                </Box>
            ))}
        </SecondaryBox>
    )
}

export default PresetsSideBar
