import { Box, Button, HStack, Spacer, Text, Textarea } from "@chakra-ui/react"
import { useLocale } from "../hooks/useLocale"
import BrandButton from "./common/BrandButton"

const GeneratedPromptBox = () => {
    const { t } = useLocale()

    return (
        <Box>
            <Text p={"2"} fontWeight={"semibold"}>
                {t.PROMPT}
            </Text>
            <Textarea
                className={"background_secondary"}
                placeholder={t.PROMPT_PLACEHOLDER}
                resize={"none"}
                isReadOnly={true}
                my={"2"}
            />
            <HStack>
                <Spacer />
                <BrandButton variant={"solid"}>C</BrandButton>
            </HStack>
        </Box>
    )
}

export default GeneratedPromptBox
