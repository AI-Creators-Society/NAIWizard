import { useLocaleState } from "../atoms/localeState"
import ja from "../locales/ja"

export const useLocale = () => {
    const { localeState } = useLocaleState()
    const t = ja
    return { locale: localeState, t }
}
