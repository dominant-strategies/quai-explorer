import { Td, Text, Tr, useColorModeValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { reduceStringShowMediumLength } from '../../utils'
import CopyToClipboardButton from '../CopyToClipboardButton/CopyToClipboardButton'

// converts hexadecimal string with a 0x PREFIX to a integer value
const hexToDec = (value) => parseInt(value.substring(2), 16)

export default function TransactionTableRowAddressPage(props) {
    const {
        transactionHash,
        blockNumber,
        quaiSent,
        // eslint-disable-next-line no-unused-vars
        fromThisMiner,
        toThisMiner,
        gas,
        blockHash,
    } = props
    const textColor = useColorModeValue('gray.700', 'white')
    // eslint-disable-next-line no-unused-vars
    const navigateTo = useNavigate()

    const toAddr = toThisMiner
    let toHashReduced
    if (toAddr) {
        toHashReduced = reduceStringShowMediumLength(toAddr)
    }

    return (
        <Tr>
            {transactionHash !== null ? (
                <Td>
                    <CopyToClipboardButton
                        innerText={reduceStringShowMediumLength(
                            transactionHash,
                        )}
                        copyThisToClipboard={transactionHash}
                    />
                </Td>
            ) : null}

            {toAddr !== null ? (
                <Td>
                    <CopyToClipboardButton
                        innerText={toHashReduced}
                        copyThisToClipboard={toAddr}
                    />
                </Td>
            ) : null}

            {quaiSent != null && (
                <Td>
                    <Text
                        fontSize="sm"
                        color={textColor}
                        fontWeight="bold"
                        pb=".5rem"
                    >
                        {quaiSent}
                    </Text>
                </Td>
            )}

            {gas != null && (
                <Td>
                    <Text
                        fontSize="sm"
                        color={textColor}
                        fontWeight="bold"
                        pb=".5rem"
                    >
                        {hexToDec(gas)}
                    </Text>
                </Td>
            )}

            {blockNumber != null && (
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
            )}

            {blockHash !== null ? (
                <Td>
                    <CopyToClipboardButton
                        innerText={reduceStringShowMediumLength(blockHash)}
                        copyThisToClipboard={blockHash}
                    />
                </Td>
            ) : null}
        </Tr>
    )
}
