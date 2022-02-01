import { Box, useStyleConfig } from "@chakra-ui/react";

export default function CardBody(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardBody", { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}
