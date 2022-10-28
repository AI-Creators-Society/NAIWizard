import { Box, Button, Center } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useState } from "react"

interface Props {
    enabled: boolean
    onChange: (enabled: boolean) => void
}

const CheckSwitch = ({ enabled, onChange }: Props) => {
    return (
        <Center
            h={"full"}
            maxW={"12"}
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
    )
}

export default CheckSwitch
