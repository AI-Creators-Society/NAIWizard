import { useDraggable } from "@dnd-kit/core"
import { ComponentProps, ReactNode } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface Props extends ComponentProps<"div"> {
    children: ReactNode | ReactNode[]
    id: string
}

const SpellItemSortable = (props: Props) => {
    const { attributes, setNodeRef, transform, transition } = useSortable({
        id: props.id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        "touch-action": "none",
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            {props.children}
        </div>
    )
}

export default SpellItemSortable
