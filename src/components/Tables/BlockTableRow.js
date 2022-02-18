import React from 'react'
import {
    Icon,
    Td,
    Text,
    Tr,
    useColorModeValue,
    IconButton,
    Link,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { reduceString } from '../../utils'
import { BsThreeDots } from 'react-icons/bs'
import { InfoOutlineIcon } from '@chakra-ui/icons'

import CopyToClipboardButton from '../CopyToClipboardButton/CopyToClipboardButton'
import { QUAI_STATS_BLOCKS_LINKS } from '../../constants'
import { buildExecutionContext } from 'graphql/execution/execute'

export default function BlockTableRow(props) {
    const { location, blockNumber, minerAddress, timestamp, hash } = props
    const textColor = useColorModeValue('gray.700', 'white')
    const navigateTo = useNavigate()
    let linkToQuaiStats = `https://${QUAI_STATS_BLOCKS_LINKS[location]}.quaistats.info/`

    if (window.innerWidth > 768) {
        return (
            <Tr>
                <Td>
                    <Text
                        fontSize="md"
                        color={'blue.500'}
                        fontWeight="bold"
                        pb=".5rem"
                    >
                        <Link href={linkToQuaiStats} isExternal>
                            {' '}
                            {location}{' '}
                        </Link>
                    </Text>
                </Td>

                <Td>
                    <Text
                        fontSize="sm"
                        color={textColor}
                        fontWeight="bold"
                        pb=".5rem"
                    >
                        {blockNumber}
                    </Text>
                </Td>

                <Td>
                    <CopyToClipboardButton
                        innerText={reduceString(minerAddress)}
                        copyThisToClipboard={minerAddress}
                    />
                </Td>

                <Td>
                    <Text
                        fontSize="sm"
                        color={textColor}
                        fontWeight="bold"
                        pb=".5rem"
                    >
                        {timestamp}
                    </Text>
                </Td>

                <Td>
                    <IconButton
                        onClick={() => navigateTo(`/block/${hash}`)}
                        cursor="pointer"
                        icon={<Icon as={BsThreeDots} />}
                    />
                </Td>
            </Tr>
        )
    } else {
        return (
            <Tr>
                <Td>
                    <IconButton
                        onClick={() => navigateTo(`/block/${hash}`)}
                        cursor="pointer"
                        icon={<InfoOutlineIcon />}
                    />
                </Td>

                <Td>
                    <Text
                        fontSize="md"
                        color={'blue.500'}
                        fontWeight="bold"
                        pb=".5rem"
                    >
                        <Link href={linkToQuaiStats} isExternal>
                            {' '}
                            {location}{' '}
                        </Link>
                    </Text>
                </Td>

                <Td>
                    <Text
                        fontSize="sm"
                        color={textColor}
                        fontWeight="bold"
                        pb=".5rem"
                    >
                        {blockNumber}
                    </Text>
                </Td>

                <Td>
                    <CopyToClipboardButton
                        innerText={reduceString(minerAddress)}
                        copyThisToClipboard={minerAddress}
                    />
                </Td>

                <Td>
                    <Text
                        fontSize="sm"
                        color={textColor}
                        fontWeight="bold"
                        pb=".5rem"
                    >
                        {timestamp}
                    </Text>
                </Td>
            </Tr>
        )
    }
}
