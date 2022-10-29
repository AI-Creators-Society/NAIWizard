import { Button, HStack, Spacer } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useLocale } from "../hooks/useLocale"
import SecondaryBox from "./common/secondaryBox"
import GeneratedPromptWidget from "./widget/generatedPromptWidget"
import PromptLoaderWidget from "./widget/promptLoaderWidget"
import SeedGeneratorWidget from "./widget/seedGeneratorWidget"

const WidgetSideBar = () => {
    const { t } = useLocale()

    return (
        <SecondaryBox w={["md"]} px={"4"} py={"2"}>
            <HStack>
                <Spacer />
                <Button variant={"ghost"} colorScheme={"gray"} fontSize={"xl"}>
                    <Icon icon={"akar-icons:settings-horizontal"} />
                </Button>
            </HStack>

            {/* 生成されたプロンプト */}
            <GeneratedPromptWidget />

            {/* 乱数機 */}
            <SeedGeneratorWidget />

            {/* プロンプトローダー */}
            <PromptLoaderWidget />
        </SecondaryBox>
    )
}

export default WidgetSideBar
