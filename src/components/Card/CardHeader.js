import { Box, useStyleConfig } from "@chakra-ui/react";

export default function CardHeader(props) {
  const { variant, children, ...otherProps } = props;
  const styles = useStyleConfig("CardHeader", { variant });
  
  return (
    <Box __css={styles} {...otherProps}>
      {children}
    </Box>
  );
}
