import { forwardRef, NumberInput, NumberInputProps } from "@chakra-ui/react"

const BrandNumberInput = forwardRef<NumberInputProps, "input">((props, ref) => {
    return <NumberInput focusBorderColor={"brand.500"} ref={ref} {...props} />
})

export default BrandNumberInput
