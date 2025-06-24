import { Menu, Portal, Show } from "@chakra-ui/react"
import { Tooltip } from "./tooltip"

const TooltipMenu = ({content, children, ...props}) => {
  return (
    <Menu.Root closeOnSelect={false}>
      <Menu.Trigger asChild>
		      {content ? content : <></>}
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content usePortal zIndex={9999}>
			      {children ? children : <></>}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const MenuItem = (props) => {
  const { value, title, onClick, ...rest } = props
  return (
    <Show when={title} fallback={<Menu.Item value={value} {...rest} />}>
      <Tooltip
        ids={{ trigger: value }}
        openDelay={200}
        closeDelay={0}
        positioning={{ placement: "right" }}
        content={title}
      >
        <Menu.Item onClick={onClick} value={value} {...rest} />
      </Tooltip>
    </Show>
  )
}
export { TooltipMenu, MenuItem as TooltipMenuItem}
