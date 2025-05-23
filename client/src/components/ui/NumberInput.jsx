import { NumberInput, InputGroup } from "@chakra-ui/react"
import { LuArrowRightLeft } from "@icons"

const NumberInputUI = ({value, icon, ...props}) => {
  return (
    <NumberInput.Root defaultValue={value} width="200px" {...props}>
      <NumberInput.Control />
	  {icon ? <InputGroup
        startElementProps={{ pointerEvents: "auto" }}
        startElement={
          <NumberInput.Scrubber>
			{icon}
          </NumberInput.Scrubber>
        }
      >
        <NumberInput.Input />
      </InputGroup>
	  : <NumberInput.Input />}
    </NumberInput.Root>
  )
}

export default NumberInputUI