import { Center } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { ComponentProps } from "react"

interface Props extends ComponentProps<"div"> {}

const DragHandle = (props: Props) => {
    return (
        <div {...props}>
            <Center minW={"8"}>
                <Icon icon={"akar-icons:drag-vertical"} />
            </Center>
        </div>
    )
}

export default DragHandle
