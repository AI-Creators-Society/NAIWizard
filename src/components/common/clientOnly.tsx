import { ReactNode } from "react"

interface Props {
    children: ReactNode | ReactNode[]
}

const ClientOnly = ({ children }: Props) => {
    if (typeof window === "undefined") {
        return null
    }
    return <>{children}</>
}

export default ClientOnly
