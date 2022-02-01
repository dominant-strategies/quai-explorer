import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Divider } from "../Divider/Divider";

export default function PopOutMenu(props) {
  const { secondary, isOpen, onClose, fixed, ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const settingsRef = React.useRef();
  
  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={document.documentElement.dir === "rtl" ? "left" : "right"}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent>
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="xl" fontWeight="bold" mt="16px">
              Settings
            </Text>
            <Divider />
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
            <Button onClick={toggleColorMode}>
                  Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
                </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

