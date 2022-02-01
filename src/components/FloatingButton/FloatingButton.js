import React from "react";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons'

export default function FloatingButton(props) {
  const { secondary, onChange, onSwitch, fixed, ...otherProps } = props;
  
  let settingsIconColor = useColorModeValue("gray.500", "gray.200");
  let buttonBackgroundColor = useColorModeValue("white", "gray.600");

  const settingsRef = React.useRef();

  return (
    <>
      <Button
        h="52px"
        w="52px"
        onClick={props.onOpen}
        bg={buttonBackgroundColor}
        position="fixed"
        variant="no-hover"
        right={document.documentElement.dir === "rtl" ? "" : "35px"}
        bottom="30px"
        borderRadius="50px"
        boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
      >
        <HamburgerIcon
          cursor="pointer"
          ref={settingsRef}
          color={settingsIconColor}
          w="20px"
          h="20px"
        />
      </Button>
    </>
  );
}
