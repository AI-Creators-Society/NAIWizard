import {
    Box,
    Button,
    Divider,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Spacer,
    Text,
} from "@chakra-ui/react"
import { Spell } from "../../types/prompt"
import BrandInput from "../common/brandInput"
import SecondaryBox from "../common/secondaryBox"

interface Props {
    spell: Spell
    inputId: number
}

const SpellBlock = ({ spell, inputId }: Props) => {
    // 次の入力にフォーカスする
    const focusNextInput = () => {
        const nextInput = document.getElementById(`${inputId + 1}`)
        if (nextInput) {
            nextInput.focus()
        } else {
            // TODO: 新しい入力を作成する
        }
    }

    const focusPrevInput = () => {
        const prevInput = document.getElementById(`${inputId - 1}`)
        if (prevInput) {
            prevInput.focus()
        }
    }

    return (
        <SecondaryBox>
            <HStack>
                <Button variant={"ghost"}>K</Button>
                <Divider orientation={"vertical"} />
                <BrandInput
                    id={String(inputId)}
                    defaultValue={spell.content}
                    variant={"flushed"}
                    onKeyDown={(e) => {
                        // shift enter
                        if (e.key === "Enter" && e.shiftKey) {
                            // TODO: 入力の挿入
                        }
                        // enter to next focus or create
                        else if (e.key === "Enter") {
                            focusNextInput()
                        }
                        // ctrl+arrow up or cmd+arrow up
                        else if ((e.key === "ArrowUp" && e.ctrlKey) || (e.key === "ArrowUp" && e.metaKey)) {
                            focusPrevInput()
                        }
                        // ctrl+arrow down
                        else if ((e.key === "ArrowDown" && e.ctrlKey) || (e.key === "ArrowDown" && e.metaKey)) {
                            focusNextInput()
                        }
                    }}
                />
                <Spacer />
                <Box py={"2"} px={"4"}>
                    <NumberInput defaultValue={spell.enhancement}>
                        <NumberInputField w={"16"} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Box>
            </HStack>
        </SecondaryBox>
    )
}

export default SpellBlock
