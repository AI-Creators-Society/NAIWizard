import { Switch, SwitchProps } from "@chakra-ui/react"

interface Props extends SwitchProps {}

const BrandSwitch = (props: Props) => {
    return <Switch colorScheme={"brand"} {...props} />
}

export default BrandSwitch
