import { Button, HStack, Spacer, Text, Textarea } from "@chakra-ui/react"
import { useLocale } from "../hooks/useLocale"
import BrandButton from "./common/brandButton"
import SecondaryBox from "./common/secondaryBox"
import GeneratedPromptBox from "./generatedPromptBox"

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
            <GeneratedPromptBox />
        </SecondaryBox>
    )
}

export default UtilitySideBar
