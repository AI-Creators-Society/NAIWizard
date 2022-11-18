import { forwardRef, Input, InputProps } from "@chakra-ui/react"

const BrandInput = forwardRef<InputProps, "input">((props, ref) => {
    return <Input focusBorderColor={"brand.500"} ref={ref} {...props} />
})

export default BrandInput
