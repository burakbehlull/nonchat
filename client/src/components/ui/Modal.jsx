"use client"

import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react"

const ModalUI = ({modalTitle, children, content, dialogRef, clickRef, onClick, clickName, closeRef}) => {
  return (
    <Dialog.Root initialFocusEl={() => dialogRef?.current} size="xs" >
      <Dialog.Trigger ref={clickRef} asChild>
		      {content ? content : <p></p>}
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
                <Button variant="outline" ref={closeRef}>Kapat</Button>
              </Dialog.ActionTrigger>
              <Button onClick={onClick}>{clickName ?? "Kaydet"}</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const ModalInputUI = ({label, ...props}) => {
	return (
		<Field.Root>
			<Field.Label>{label}</Field.Label>
			<Input {...props} />
		</Field.Root>
	)
}

export {
	ModalUI,
	ModalInputUI
}