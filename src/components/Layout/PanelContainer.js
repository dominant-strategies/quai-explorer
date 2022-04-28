import { Box, useStyleConfig } from '@chakra-ui/react'

function PanelContainer(props) {
    const { variant, children, ...otherProps } = props
    const styles = useStyleConfig('PanelContainer', { variant })
    // Pass the computed styles into the `__css` prop
    return (
        <Box __css={styles} {...otherProps}>
            {children}
        </Box>
    )
}

export default PanelContainer
