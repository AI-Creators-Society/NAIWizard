import { Button, ButtonProps, useClipboard } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useEffect } from "react"
import { useLocale } from "../../hooks/useLocale"
import BrandButton from "./brandButton"

interface Props extends ButtonProps {
    value: string
    brand?: boolean
}

const CopyIconButton = ({ value, brand = true, ...props }: Props) => {
    const { t } = useLocale()
    const { hasCopied, onCopy, setValue } = useClipboard(value)

    useEffect(() => {
        setValue(value)
    }, [value])

    return brand ? (
        <BrandButton title={t.COPY} variant={"solid"} onClick={onCopy} {...props}>
            {hasCopied ? <Icon icon={"bx:check"} /> : <Icon icon={"akar-icons:copy"} />}
        </BrandButton>
    ) : (
        <Button title={t.COPY} variant={"solid"} onClick={onCopy} {...props}>
            {hasCopied ? <Icon icon={"bx:check"} /> : <Icon icon={"akar-icons:copy"} />}
        </Button>
    )
}

export default CopyIconButton
