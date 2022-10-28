export const generateRandomId = (length: number = 8): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    let result = ""
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

export const generateRandomSeed = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
