import { Box, Button, HStack, Text, useClipboard } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import BrandInput from "../common/brandInput"

interface Props {
    title: string
    value: string
}

const ValueDisplay = ({ title, value }: Props) => {
    const { hasCopied, onCopy } = useClipboard(value)

    return (
        <Box my={"2"}>
            <Text fontWeight={"semibold"}>{title}</Text>
            <HStack>
                <BrandInput contentEditable={false} value={value} />
                <Button w={"16"} fontSize={"xl"} variant={"outline"} colorScheme={"brand"} onClick={onCopy}>
                    {hasCopied ? <Icon icon={"bx:check"} /> : <Icon icon={"akar-icons:copy"} />}
                </Button>
            </HStack>
        </Box>
    )
}

export default ValueDisplay
