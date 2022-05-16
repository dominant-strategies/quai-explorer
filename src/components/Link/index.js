import { Link as ChakraLink } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function Link({ to = '', href, ...props }) {
    const navigateTo = useNavigate()
    if (href) {
        return <ChakraLink href={href} isExternal {...props} />
    }

    return <ChakraLink onClick={() => navigateTo(to)} {...props} />
}

export default Link
