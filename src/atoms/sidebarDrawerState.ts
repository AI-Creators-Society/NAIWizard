import { atom, useRecoilState } from "recoil"

const sidebarDrawerKey = "sidebarDrawer"

export interface SidebarDrawerState {
    isOpen: boolean
}

const defaultState: SidebarDrawerState = {
    isOpen: false,
}

const sidebarDrawerStateAtom = atom<SidebarDrawerState>({
    key: sidebarDrawerKey,
    default: defaultState,
})

export const useSidebarDrawerState = () => {
    const [sidebarDrawerState, setSidebarDrawerState] = useRecoilState(sidebarDrawerStateAtom)

    const toggleDrawer = () => {
        setSidebarDrawerState({
            ...sidebarDrawerState,
            isOpen: !sidebarDrawerState.isOpen,
        })
    }

    return { isOpen: sidebarDrawerState.isOpen, toggleDrawer }
}
