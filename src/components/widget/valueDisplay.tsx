import { Box, Button, HStack, Text, useClipboard } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useEffect } from "react"
import BrandInput from "../common/brandInput"
import CopyIconButton from "../common/copyIconButton"

interface Props {
    title: string
    value: string
}

const ValueDisplay = ({ title, value }: Props) => {
    return (
        <Box my={"2"}>
            <Text fontWeight={"semibold"}>{title}</Text>
            <HStack my={"1"}>
                <BrandInput contentEditable={false} value={value} />
                <CopyIconButton
                    w={"16"}
                    fontSize={"xl"}
                    variant={"outline"}
                    colorScheme={"brand"}
                    value={value}
                    brand={false}
                />
            </HStack>
        </Box>
    )
}

export default ValueDisplay
