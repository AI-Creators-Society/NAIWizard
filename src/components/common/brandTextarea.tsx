import { forwardRef, Textarea, TextareaProps } from "@chakra-ui/react"

const BrandTextarea = forwardRef<TextareaProps, "textarea">((props, ref) => {
    return <Textarea focusBorderColor={"brand.500"} ref={ref} {...props} />
})

export default BrandTextarea
