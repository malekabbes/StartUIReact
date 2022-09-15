import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import {
  Button,
  ChakraComponent,
  Flex,
  FlexProps,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuProps,
  Portal,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

import { Icon } from '@/components/Icons';

type NavContextValue = {
  active: ReactNode;
  setActive: (active: ReactNode) => void;
  isMenu: boolean;
};

const NavContext = React.createContext<NavContextValue>({
  active: '',
  setActive: () => undefined,
  isMenu: false,
});
const useNavContext = () => React.useContext(NavContext);

type NavProps = React.PropsWithChildren<MenuProps> & {
  breakpoint?: string;
};

export const Nav = ({ children, breakpoint = 'lg', ...rest }: NavProps) => {
  const isMenu = useBreakpointValue({
    base: true,
    [breakpoint]: false,
  });

  const [active, setActive] = useState<ReactNode>(<>-</>);
  return (
    <NavContext.Provider value={{ active, setActive, isMenu: !!isMenu }}>
      <Menu matchWidth {...rest}>
        {!isMenu && <Stack spacing="1">{children}</Stack>}
        {isMenu && (
          <>
            <MenuButton
              textAlign="left"
              as={Button}
              rightIcon={<FiChevronDown />}
              sx={{ '> *': { minW: 0 } }}
            >
              {active}
            </MenuButton>
            <Portal>
              <MenuList>{children}</MenuList>
            </Portal>
          </>
        )}
      </Menu>
    </NavContext.Provider>
  );
};

type NavItemProps = FlexProps & {
  icon?: React.FC<React.PropsWithChildren<unknown>>;
  isActive?: boolean;
};

export const NavItem: ChakraComponent<'span', NavItemProps> = ({
  children,
  icon,
  isActive = false,
  ...rest
}) => {
  const { setActive, isMenu } = useNavContext();
  const Item = isMenu ? MenuItem : Flex;

  const itemContent = useMemo(
    () => (
      <Flex as="span" align="center" minW="0">
        {icon && (
          <Icon
            icon={icon}
            mt="0.05rem"
            me="2"
            fontSize="lg"
            color={isActive ? 'brand.500' : 'gray.400'}
            _dark={{ color: isActive ? 'brand.300' : 'gray.400' }}
          />
        )}
        <Text as="span" noOfLines={isMenu ? 1 : 2}>
          {children}
        </Text>
      </Flex>
    ),
    [icon, children, isActive, isMenu]
  );

  useEffect(() => {
    if (isActive) {
      setActive(itemContent);
    }
  }, [isActive, setActive, itemContent]);

  return (
    <Item
      px="3"
      py="2"
      borderRadius={isMenu ? undefined : 'md'}
      transition="0.2s"
      fontSize="sm"
      fontWeight="bold"
      bg={isActive ? 'white' : 'transparent'}
      color={isActive ? 'gray.700' : 'gray.600'}
      _dark={{
        color: isActive ? 'white' : 'gray.300',
        bg: isActive ? 'blackAlpha.300' : 'transparent',
      }}
      _hover={
        !isActive && !isMenu
          ? {
              bg: 'white',
              color: 'gray.700',
              _dark: {
                bg: 'blackAlpha.300',
                color: 'gray.100',
              },
            }
          : {}
      }
      {...rest}
    >
      {itemContent}
    </Item>
  );
};

export const NavGroup: FC<React.PropsWithChildren<FlexProps>> = ({
  children,
  title,
  ...rest
}) => {
  const { isMenu } = useNavContext();

  if (isMenu) {
    return (
      <MenuGroup title={title} {...rest}>
        {children}
      </MenuGroup>
    );
  }
  return (
    <Flex direction="column">
      <Flex
        fontSize="xs"
        fontWeight="bold"
        px="3"
        pt="6"
        pb="2"
        color="gray.500"
        _dark={{ color: 'gray.300' }}
        {...rest}
      >
        {title}
      </Flex>
      <Stack spacing="1">{children}</Stack>
    </Flex>
  );
};
