import { useBreakpointValue } from "@chakra-ui/react"

export const useResponsive = () => {
    const isPC = useBreakpointValue({ base: false, lg: true })
    const isMobile = useBreakpointValue({ base: true, md: false })

    return { isPC, isMobile }
}
