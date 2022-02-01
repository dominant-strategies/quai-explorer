import { Box, useStyleConfig } from "@chakra-ui/react";

export default function MainPanel(props) {
  const { variant, children, ...otherProps } = props;
  const styles = useStyleConfig("MainPanel", { variant });
  
  return (
    <Box __css={styles} {...otherProps}>
      {children}
    </Box>
  );
}


