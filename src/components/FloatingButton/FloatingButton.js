import React from "react";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons'

export default function FloatingButton(props) {
  let settingsIconColor = useColorModeValue("gray.500", "gray.200");
  let buttonBackgroundColor = useColorModeValue("white", "gray.600");
  const settingsRef = React.useRef();

  return (
    <>
      <Button
        h="60px"
        w="60px"
        onClick={props.onOpen}
        bg={buttonBackgroundColor}
        position="fixed"
        variant="no-hover"
        right="35px"
        bottom="40px"
        borderRadius="50px"
        boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
      >
        <HamburgerIcon
          cursor="pointer"
          ref={settingsRef}
          color={settingsIconColor}
          w="22px"
          h="22px"
        />
      </Button>
    </>
  );
}
