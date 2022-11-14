import {
    Button,
    HStack,
    Spacer,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useWidgetDrawerState } from "../atoms/widgetDrawerState"
import { useLocale } from "../hooks/useLocale"
import { useResponsive } from "../hooks/useResponsive"
import SecondaryBox from "./common/secondaryBox"
import GeneratedPromptWidget from "./widget/generatedPromptWidget"
import PromptLoaderWidget from "./widget/promptLoaderWidget"
import SeedGeneratorWidget from "./widget/seedGeneratorWidget"

const SideBarContent = () => {
    const { isMobile } = useResponsive()

    return (
        <>
            {!isMobile && (
                <HStack>
                    <Spacer />
                    <Button variant={"ghost"} colorScheme={"gray"} fontSize={"xl"}>
                        <Icon icon={"akar-icons:settings-horizontal"} />
                    </Button>
                </HStack>
            )}

            {/* 生成されたプロンプト */}
            <GeneratedPromptWidget />

            {/* 乱数機 */}
            <SeedGeneratorWidget />

            {/* プロンプトローダー */}
            <PromptLoaderWidget />
        </>
    )
}

const WidgetSideBar = () => {
    const { isMobile } = useResponsive()
    const { isOpen, toggleDrawer } = useWidgetDrawerState()

    return (
        <>
            {isMobile ? (
                <Drawer isOpen={isOpen} placement={"right"} size={"sm"} onClose={toggleDrawer}>
                    <DrawerOverlay />
                    <DrawerContent backgroundColor={"background.secondary"}>
                        <DrawerCloseButton />
                        <DrawerHeader>Widgets</DrawerHeader>

                        <DrawerBody>
                            <SideBarContent />
                        </DrawerBody>

                        <DrawerFooter>
                            <HStack>
                                <Spacer />
                                <Button variant={"ghost"} colorScheme={"gray"} fontSize={"xl"}>
                                    <Icon icon={"akar-icons:settings-horizontal"} />
                                </Button>
                            </HStack>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            ) : (
                <SecondaryBox w={["md"]} px={"4"} py={"2"}>
                    <SideBarContent />
                </SecondaryBox>
            )}
        </>
    )
}

export default WidgetSideBar
