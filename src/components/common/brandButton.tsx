import { Button, ButtonProps } from "@chakra-ui/react"

const BrandButton = (props: ButtonProps) => {
    return <Button colorScheme={"brand"} color={"background.main"} {...props} />
}

export default BrandButton
