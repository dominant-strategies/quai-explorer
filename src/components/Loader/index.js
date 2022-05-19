import { Flex, Spinner } from '@chakra-ui/react'

function Loader({ label }) {
    return (
        <Flex justify="center" align="center" h="70vh">
            <Spinner
                thickness="2px"
                speed="0.65s"
                emptyColor="gray.300"
                color="brand.300"
                size="md"
                ml={4}
                mt={2}
                label={label}
            />
        </Flex>
    )
}

export default Loader
