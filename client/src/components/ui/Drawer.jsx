import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"

const DrawerUI = ({content, buttonSize, title, children, closeButtonSize, footer}) => {
  return (
    <Drawer.Root placement="start">
      <Drawer.Trigger asChild>
		{content}
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{children}</Drawer.Body>
			{footer ? (
				<>
					<Drawer.Footer>
					  <Button variant="outline">Kapat</Button>
					  <Button>Save</Button>
					</Drawer.Footer>
					<Drawer.CloseTrigger asChild>
					  <CloseButton size={closeButtonSize ?? "sm"} />
					</Drawer.CloseTrigger>
				</>
			) : (null)
			}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default DrawerUI