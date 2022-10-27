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
import SecondaryBox from "../common/secondaryBox"

interface Props {
    spell: Spell
}

const SpellBlock = ({ spell }: Props) => {
    return (
        <SecondaryBox>
            <HStack>
                <Button variant={"ghost"}>K</Button>
                <Divider orientation={"vertical"} />
                <Text>{spell.content}</Text>
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
