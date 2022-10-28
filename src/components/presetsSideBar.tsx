import { Box, Select, Text } from "@chakra-ui/react"
import { useWizardState, WizardType } from "../atoms/wizardState"
import { useLocale } from "../hooks/useLocale"
import { Prompt } from "../types/prompt"
import SecondaryBox from "./common/secondaryBox"
import PresetCard from "./preset/presetCard"

interface Props {
    prompts: Prompt[]
}

const PresetsSideBar = ({ prompts }: Props) => {
    const { wizardState, setWizardType } = useWizardState()
    const { t } = useLocale()

    return (
        <SecondaryBox w={["sm"]}>
            <Select
                variant={"flushed"}
                p={"4"}
                fontWeight={"bold"}
                onChange={(e) => {
                    setWizardType(e.target.value as WizardType)
                }}
            >
                <option value={"positive"}>{t.POSITIVE_PROMPT}</option>
                <option value={"negative"}>{t.NEGATIVE_PROMPT}</option>
            </Select>

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
