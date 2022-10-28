import { Box, Button, Center, CenterProps } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useState } from "react"
import { useLocale } from "../../hooks/useLocale"

interface Props {
    enabled: boolean
    onChange: (enabled: boolean) => void
}

const CheckSwitch = ({ enabled, onChange }: Props) => {
    const { t } = useLocale()
    return (
        <Button title={t.TOGGLE_ENABLE} variant={"unstyled"} h={"full"} maxW={"12"} w={"full"}>
            <Center
                h={"full"}
                w={"full"}
                color={enabled ? "background.main" : "gray.500"}
                backgroundColor={enabled ? "brand.500" : "background.secondary"}
                fontSize={"xl"}
                onClick={(e) => {
                    onChange(!enabled)
                }}
            >
                <Icon icon={"fa:check"} />
            </Center>
        </Button>
    )
}

export default CheckSwitch
