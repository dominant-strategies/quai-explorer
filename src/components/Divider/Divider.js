import React from "react";
import { Flex } from "@chakra-ui/react";

export function Divider(props) {
  const { variant, children, ...otherProps } = props;
  const gradient = "linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0) 100%)"
  return (
    <Flex
      h="1px"
      w="100%"
      bg={gradient}
      {...otherProps}
    >
      {children}
    </Flex>
  );
}