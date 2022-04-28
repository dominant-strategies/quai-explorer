import { Flex } from '@chakra-ui/react'

export default function IconBox(props) {
    const { children, ...otherProps } = props

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            borderRadius="10px"
            {...otherProps}
        >
            {children}
        </Flex>
    )
}
