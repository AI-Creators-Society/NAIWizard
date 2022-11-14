import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    Select,
    Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useSidebarDrawerState } from "../atoms/sidebarDrawerState"
import { useWizardState, WizardType } from "../atoms/wizardState"
import { useLocale } from "../hooks/useLocale"
import { usePrompts } from "../hooks/usePrompts"
import { useResponsive } from "../hooks/useResponsive"
import { Prompt } from "../types/prompt"
import { WizardDB } from "../utils/db"
import BrandButton from "./common/brandButton"
import SecondaryBox from "./common/secondaryBox"
import PresetCard from "./preset/presetCard"

interface Props {}

const SideBarContent = () => {
    const { wizardState, setWizardType } = useWizardState()
    const { t } = useLocale()
    const { prompts } = usePrompts()

    const db = new WizardDB()

    return (
        <>
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

            {/* テスト用に追加するボタン */}
            <BrandButton
                onClick={(e) => {
                    db.newPrompt({
                        title: "test",
                        type: "positive",
                        spells: [
                            {
                                content: "test",
                                enhancement: 0,
                                enabled: true,
                                parentId: "",
                            },
                        ],
                    })
                }}
            >
                Add
            </BrandButton>
        </>
    )
}

const PresetsSideBar = ({}: Props) => {
    const { isOpen, toggleDrawer } = useSidebarDrawerState()
    const { t } = useLocale()
    const { isPC } = useResponsive()
    return (
        <>
            {isPC ? (
                <SecondaryBox w={["sm"]}>
                    <Heading as={"h1"} m={"4"} size={"lg"}>
                        NAIWizard
                    </Heading>
                    <SideBarContent />
                </SecondaryBox>
            ) : (
                <Drawer isOpen={isOpen} placement={"left"} size={"sm"} onClose={toggleDrawer}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>NAIWizard</DrawerHeader>

                        <DrawerBody>
                            <SideBarContent />
                        </DrawerBody>

                        <DrawerFooter></DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </>
    )
}

export default PresetsSideBar
