import { ChevronUpIcon } from '@chakra-ui/icons';
import { Button, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";

export default function FloatingButton(props) {
  let settingsIconColor = useColorModeValue("gray.800", "gray.200");
  let buttonBackgroundColor = useColorModeValue("white", "gray.600");
  const settingsRef = React.useRef();

  const [visible, setVisible] = useState(false)

  let documentHeight = document.body.clientHeight;

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > documentHeight - 700) {
      setVisible(true)
    }
    else if (scrolled <= 100) {
      setVisible(false)
    }

  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <>
      <Button
        h="60px"
        w="60px"
        onClick={scrollToTop}
        bg={buttonBackgroundColor}
        position="fixed"
        variant="no-hover"
        right="35px"
        bottom="70px"
        borderRadius="50px"
        boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
        display={visible ? 'inline' : 'none'}
      >
        <ChevronUpIcon
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
