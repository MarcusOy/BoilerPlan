import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";

const Header = () => {
  return (
    <HStack
      p="2"
      px="5"
      bg="gray.700"
      borderBottomWidth="1px"
      borderBottomColor="gray.600"
    >
      <Heading size="md">Boilerplan</Heading>
      <HStack flexGrow={1} justifyContent="end">
        <Box>
          <Menu placement="bottom">
            <MenuButton
              as={Button}
              bg="gray.700"
              rightIcon={<ChevronDownIcon />}
            >
              <HStack>
                <Avatar name="Guest" size="sm"></Avatar>
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  Guest
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>View info</MenuItem>
              <MenuItem>Block contact</MenuItem>
              <MenuItem color="red">Delete conversation</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </HStack>
  );
};

export default Header;
