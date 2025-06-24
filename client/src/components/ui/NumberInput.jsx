import { NumberInput, InputGroup } from "@chakra-ui/react"

const NumberInputUI = ({value, icon, ref, ...props}) => {
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
        <NumberInput.Input ref={ref ?? null} />
      </InputGroup>
	  : <NumberInput.Input ref={ref ?? null} />}
    </NumberInput.Root>
  )
}

export default NumberInputUI