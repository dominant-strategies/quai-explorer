import { Box, useStyleConfig } from '@chakra-ui/react'

function PanelContent(props) {
    const { variant, children, ...otherProps } = props
    const styles = useStyleConfig('PanelContent', { variant })
    // Pass the computed styles into the `__css` prop
    return (
        <Box __css={styles} {...otherProps}>
            {children}
        </Box>
    )
}

export default PanelContent
