import { useDroppable } from "@dnd-kit/core"
import { ComponentProps, ReactNode } from "react"

interface Props extends ComponentProps<"div"> {
    children: ReactNode | ReactNode[]
}

const SpellItemDroppable = ({ children }: Props) => {
    const { setNodeRef } = useDroppable({
        id: "spell-item",
    })

    return <div ref={setNodeRef}>{children}</div>
}

export default SpellItemDroppable
