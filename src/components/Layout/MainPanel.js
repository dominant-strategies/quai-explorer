import { Box, useStyleConfig } from "@chakra-ui/react";

export default function MainPanel(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("MainPanel", { variant });
  
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}


