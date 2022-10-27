import { Textarea, TextareaProps } from "@chakra-ui/react"

const BrandTextarea = (props: TextareaProps) => {
    return <Textarea focusBorderColor={"brand.500"} {...props} />
}

export default BrandTextarea
