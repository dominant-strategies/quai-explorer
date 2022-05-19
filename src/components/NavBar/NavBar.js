import { useQuery } from '@apollo/client'
import {
    HamburgerIcon,
    MoonIcon,
    SearchIcon,
    SmallCloseIcon,
    SunIcon,
} from '@chakra-ui/icons'
import {
    Box,
    Flex,
    Icon,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { BsBox } from 'react-icons/bs'
import { GiMoneyStack } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import LogoBanner from '../../assets/images/logoandText.png'
// import LogoBannerGray from '../../assets/images/logoandText.png'
import {
    GET_BLOCK_WITH_HASH,
    GET_TRANSACTIONS_FOR_FROM_ADDRESS,
    GET_TRANSACTIONS_FOR_TO_ADDRESS,
    GET_TRANSACTION_WITH_HASH,
} from '../../utils/queries'

export default function NavBar() {
    // eslint-disable-next-line no-unused-vars
    const settingsRef = useRef()
    const { colorMode, toggleColorMode } = useColorMode()
    const [searchHash, setSearchHash] = useState('')
    const navigateTo = useNavigate()

    const { data: BlockData, refetch: refetchBlockData } = useQuery(
        GET_BLOCK_WITH_HASH,
        { variables: { hash: searchHash } },
    )
    const { data: TransactionData, refetch: refetchTransactionData } = useQuery(
        GET_TRANSACTION_WITH_HASH,
        { variables: { hash: searchHash } },
    )
    const {
        data: TransactionFromAddressData,
        refetch: refetchTransactionFromAddressData,
    } = useQuery(GET_TRANSACTIONS_FOR_FROM_ADDRESS, {
        variables: { num: 1, offset: 1, hash: searchHash },
    })

    const {
        data: TransactionToAddressData,
        refetch: refetchTransactionToAddressData,
    } = useQuery(GET_TRANSACTIONS_FOR_TO_ADDRESS, {
        variables: { num: 1, offset: 1, hash: searchHash },
    })

    const mainTextColor = useColorModeValue('gray.700', 'gray.200')
    const inputBgColor = useColorModeValue('white', 'gray.800')
    const quaiOrangeColor = useColorModeValue('brand.300', 'brand.300')
    const searchIconColor = useColorModeValue('gray.700', 'gray.200')
    const navbarFilter = useColorModeValue(
        'none',
        'drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))',
    )
    const navbarShadow = useColorModeValue(
        '0px 7px 23px rgba(0, 0, 0, 0.05)',
        'none',
    )
    const navbarBg = useColorModeValue(
        'linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)',
        'linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)',
    )
    const navbarBorder = useColorModeValue(
        '#FFFFFF',
        'rgba(255, 255, 255, 0.31)',
    )

    /**
     * Given a block/transaction hash, this handles navigating to the deatils page of the hash
     * The searchHash is stored in the component's state
     */
    const searchHashEvent = () => {
        refetchBlockData()
        refetchTransactionData()
        refetchTransactionFromAddressData()
        refetchTransactionToAddressData()

        if (
            BlockData ||
            TransactionData ||
            TransactionFromAddressData ||
            TransactionToAddressData
        ) {
            if (BlockData?.blocks.length > 0) {
                navigateTo(`/block/${searchHash}`)
                setSearchHash('')
            }

            if (TransactionData?.transactions.length > 0) {
                navigateTo(`/tx/${searchHash}`)
                setSearchHash('')
            }

            if (TransactionFromAddressData?.transactions.length > 0) {
                navigateTo(`/address/${searchHash}`)
                setSearchHash('')
            }

            if (TransactionToAddressData?.transactions.length > 0) {
                navigateTo(`/address/${searchHash}`)
                setSearchHash('')
            }
        }
    }

    /**
     * Handles tapping 'Enter' in the search input
     * Navigates to the details page for the block/transaction that is searched for
     * @param {*} event - key press
     */
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchHashEvent()
        }
    }

    const showSearchIconInSearchBar = () => {
        if (
            (BlockData?.blocks.length > 0 ||
                TransactionData?.transactions.length > 0 ||
                TransactionFromAddressData?.transactions.length > 0 ||
                TransactionToAddressData?.transactions.length > 0) &&
            searchHash.length !== 0
        ) {
            return (
                <InputRightElement
                    // eslint-disable-next-line react/no-children-prop
                    children={
                        <IconButton
                            aria-label="Click to search"
                            onClick={() => searchHashEvent()}
                            bg="inherit"
                            borderRadius="inherit"
                            _hover="none"
                            _active={{
                                bg: 'inherit',
                                transform: 'none',
                                borderColor: 'transparent',
                            }}
                            _focus={{
                                boxShadow: 'none',
                            }}
                            icon={
                                <SearchIcon
                                    color={searchIconColor}
                                    w="15px"
                                    h="15px"
                                    aria-label="Click to Search"
                                />
                            }
                        />
                    }
                />
            )
        }
        if (searchHash.length !== 0) {
            return (
                <InputRightElement
                    // eslint-disable-next-line react/no-children-prop
                    children={
                        <IconButton
                            aria-label="Invalid query"
                            onClick={() => setSearchHash('')}
                            bg="inherit"
                            borderRadius="inherit"
                            _hover="none"
                            _active={{
                                bg: 'inherit',
                                transform: 'none',
                                borderColor: 'transparent',
                            }}
                            _focus={{
                                boxShadow: 'none',
                            }}
                            icon={
                                <SmallCloseIcon
                                    color="red.600"
                                    w="15px"
                                    h="15px"
                                    aria-label="Invalid query"
                                />
                            }
                        />
                    }
                />
            )
        }

        return null
    }

    return (
        <Flex
            position="fixed"
            boxShadow={navbarShadow}
            bg={navbarBg}
            borderColor={navbarBorder}
            filter={navbarFilter}
            backdropFilter="blur(21px)"
            borderWidth="1.5px"
            borderStyle="solid"
            transitionDelay="0s, 0s, 0s, 0s"
            transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
            transition-property="box-shadow, background-color, filter, border"
            transitionTimingFunction="linear, linear, linear, linear"
            alignItems={{ xl: 'center' }}
            borderRadius="16px"
            display="flex"
            minH="75px"
            justifyContent={{ xl: 'center' }}
            lineHeight="25.6px"
            mx="auto"
            pb="12px"
            right="30px"
            px={{
                sm: '15px',
                md: '0px',
            }}
            ps={{
                xl: '12px',
            }}
            pt="12px"
            top="10px"
            w={{ sm: 'calc(100vw - 60px)', xl: 'calc(100vw - 110px)' }}
        >
            <Flex
                w="100%"
                flexDirection={{
                    sm: 'column',
                    md: 'row',
                }}
                alignItems={{ xl: 'center' }}
            >
                {colorMode === 'light' ? (
                    <Image
                        onClick={() => navigateTo(`/`)}
                        cursor="pointer"
                        src={LogoBanner}
                        w={{
                            sm: '125px',
                            md: '125px',
                            lg: '125px',
                            xl: '125px',
                        }}
                        ml={2}
                        mt={{
                            sm: '12px',
                            md: '12px',
                        }}
                        mb={1}
                        alt="logo"
                    />
                ) : (
                    <Image
                        onClick={() => navigateTo(`/`)}
                        cursor="pointer"
                        src={LogoBanner}
                        w={{
                            sm: '125px',
                            md: '125px',
                            lg: '125px',
                            xl: '125px',
                        }}
                        ml={2}
                        mt={{
                            sm: '12px',
                            md: '12px',
                        }}
                        mb={2}
                        alt="logo"
                    />
                )}

                <Box ms="auto" w={{ sm: '100%', md: 'unset' }}>
                    <Flex
                        pe={{ sm: '0px', md: '16px' }}
                        w={{ sm: '100%', md: 'auto' }}
                        alignItems="center"
                        flexDirection="row"
                        mt={{
                            sm: '5px',
                            md: '10px',
                            lg: '10px',
                            xl: '5px',
                        }}
                    >
                        <InputGroup
                            cursor="pointer"
                            bg={inputBgColor}
                            borderRadius="15px"
                            w={{
                                sm: '100vw',
                                md: 'calc(100vw - 200px)',
                                lg: 'calc(100vw - 250px)',
                                xl: 'calc(100vw - 375px)',
                            }}
                            me={{ sm: 'auto', md: '20px' }}
                            _focus={{
                                borderColor: { quaiOrangeColor },
                            }}
                            _active={{
                                borderColor: { quaiOrangeColor },
                            }}
                            ml={4}
                        >
                            {showSearchIconInSearchBar()}
                            <Input
                                fontSize="xs"
                                py="11px"
                                color={mainTextColor}
                                placeholder="Search by Txn Hash/Block/Address"
                                borderRadius="inherit"
                                focusBorderColor="brand.300"
                                onChange={(e) => setSearchHash(e.target.value)}
                                value={searchHash}
                                onKeyPress={handleKeyPress}
                                onFocus={(e) => e.target.select()}
                            />
                        </InputGroup>

                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<HamburgerIcon />}
                                variant="outline"
                                cursor="pointer"
                                ms={{ base: '16px', xl: '0px' }}
                                me="16px"
                            />
                            <MenuList>
                                <MenuItem
                                    icon={<Icon as={BiHomeAlt} />}
                                    onClick={() => navigateTo('/')}
                                >
                                    Home
                                </MenuItem>
                                <MenuItem
                                    icon={<Icon as={BsBox} />}
                                    onClick={() => navigateTo('/blocks')}
                                >
                                    All Blocks
                                </MenuItem>
                                <MenuItem
                                    icon={<Icon as={GiMoneyStack} />}
                                    onClick={() => navigateTo('/transactions')}
                                >
                                    All Transactions
                                </MenuItem>
                                <MenuItem
                                    icon={
                                        colorMode === 'light' ? (
                                            <MoonIcon />
                                        ) : (
                                            <SunIcon />
                                        )
                                    }
                                    onClick={toggleColorMode}
                                >
                                    {colorMode === 'light'
                                        ? 'Dark Mode'
                                        : 'Light Mode'}
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    )
}
