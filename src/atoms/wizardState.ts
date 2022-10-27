import { atom, useRecoilState } from "recoil"

const wizardStateKey = "wizardState"

export type WizardType = "positive" | "negative"

export interface WizardState {
    type: WizardType
}

const defaultState: WizardState = {
    type: "positive",
}

const wizardStateAtom = atom<WizardState>({
    key: wizardStateKey,
    default: defaultState,
})

export const useWizardState = () => {
    const [wizardState, setWizardState] = useRecoilState(wizardStateAtom)

    const setWizardType = (type: WizardType) => {
        setWizardState({
            ...wizardState,
            type,
        })
    }

    return { wizardState, setWizardType }
}
