import { atom, useRecoilState } from "recoil"

const localeStateKey = "locale"

export type LocaleState = "ja"

const defaultState: LocaleState = "ja"

const localeStateAtom = atom<LocaleState>({
    key: localeStateKey,
    default: defaultState,
})

export const useLocaleState = () => {
    const [localeState, setLocaleState] = useRecoilState(localeStateAtom)

    return { localeState, setLocaleState }
}
