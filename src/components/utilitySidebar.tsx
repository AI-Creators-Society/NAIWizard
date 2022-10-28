import { Button, HStack, Spacer } from "@chakra-ui/react"
import { useLocale } from "../hooks/useLocale"
import SecondaryBox from "./common/secondaryBox"
import GeneratedPromptWidget from "./widget/generatedPromptWidget"

const UtilitySideBar = () => {
    const { t } = useLocale()

    return (
        <SecondaryBox w={["md"]} px={"4"} py={"2"}>
            <HStack>
                <Spacer />
                <Button variant={"ghost"} colorScheme={"gray"}>
                    S
                </Button>
            </HStack>

            {/* 生成されたプロンプト */}
            <GeneratedPromptWidget />
        </SecondaryBox>
    )
}

export default UtilitySideBar
