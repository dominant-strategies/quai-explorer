import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useRef } from 'react'
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    Flex,
    HStack,
    Text,
    useColorMode,
} from '@chakra-ui/react'
import { Divider } from '../Divider/Divider'

export default function PopOutMenu(props) {
    // eslint-disable-next-line no-unused-vars
    const { secondary, isOpen, onClose, fixed, ...otherProps } = props
    const { colorMode, toggleColorMode } = useColorMode()
    const settingsRef = useRef()

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement={
                document.documentElement.dir === 'rtl' ? 'left' : 'right'
            }
            finalFocusRef={settingsRef}
            blockScrollOnMount={false}
        >
            <DrawerContent>
                <DrawerHeader pt="24px" px="24px">
                    <DrawerCloseButton />
                    <Text fontSize="xl" fontWeight="bold" mt="16px">
                        Menu
                    </Text>
                    <Divider />
                </DrawerHeader>
                <DrawerBody w="340px" ps="24px" pe="40px">
                    <Flex flexDirection="column">
                        <Button onClick={toggleColorMode}>
                            <HStack>
                                {colorMode === 'light' ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )}
                                <Text>Toggle</Text>
                                {colorMode === 'light' ? (
                                    <Text> Dark </Text>
                                ) : (
                                    <Text>Light</Text>
                                )}
                            </HStack>
                        </Button>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}
