import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import './dropdown.css'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const Trigger = DropdownMenuPrimitive.Trigger

export function Content({
  children,
  className,
  ...props
}: DropdownMenuPrimitive.MenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        {...props}
        className={`rx-dropdown ${className ? className : ''}`}
      >
        {children}
        <DropdownMenuPrimitive.Arrow style={{ fill: 'white' }} />
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
}

export function Seperator() {
  return (
    <DropdownMenuPrimitive.Separator
      style={{
        height: 1,
        backgroundColor: 'black',
        margin: 5,
      }}
    />
  )
}

export function Item({
  children,
  className,
  ...props
}: DropdownMenuPrimitive.MenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      {...props}
      className={`rx-dropdown-item ${className ? className : ''}`}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
}

export function ExampleDropDown() {
  return (
    <>
      hello
      <DropdownMenu>
        <Trigger asChild>Open</Trigger>
        <Content sideOffset={5}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Seperator />
          <Item>Item 3</Item>
        </Content>
      </DropdownMenu>
    </>
  )
}
