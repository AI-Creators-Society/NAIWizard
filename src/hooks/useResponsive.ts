import { useBreakpointValue } from "@chakra-ui/react"

export const useResponsive = () => {
    const isPC = useBreakpointValue({ base: false, lg: true })

    return { isPC }
}
