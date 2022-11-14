import { atom, useRecoilState } from "recoil"

const widgetDrawerKey = "widgetDrawer"

export interface WidgetDrawerState {
    isOpen: boolean
}

const defaultState: WidgetDrawerState = {
    isOpen: false,
}

const widgetDrawerStateAtom = atom<WidgetDrawerState>({
    key: widgetDrawerKey,
    default: defaultState,
})

export const useWidgetDrawerState = () => {
    const [widgetDrawerState, setWidgetDrawerState] = useRecoilState(widgetDrawerStateAtom)

    const toggleDrawer = () => {
        setWidgetDrawerState({
            ...widgetDrawerState,
            isOpen: !widgetDrawerState.isOpen,
        })
    }

    return { isOpen: widgetDrawerState.isOpen, toggleDrawer }
}
