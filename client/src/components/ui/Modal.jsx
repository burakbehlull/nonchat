"use client"

import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react"
import { useRef } from "react"

const ModalUI = ({modalTitle, children, content}) => {
  
  return (
    <Dialog.Root initialFocusEl={() => ref.current} size="xs">
      <Dialog.Trigger asChild>
		{content}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{modalTitle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
			  {children}
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Kapat</Button>
              </Dialog.ActionTrigger>
              <Button>Kaydet</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const InputUI = ({label, ...props}) => {
	return (
		<Field.Root>
			<Field.Label>{label}</Field.Label>
			<Input {...props} />
		</Field.Root>
	)
}

export {
	ModalUI,
	InputUI
}