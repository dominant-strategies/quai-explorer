import { Flex, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { toQuai } from '../../utils';
import Pagination from "../Pagination";
import TransactionTableRow from "../TableRows/TransactionTableRow";

export default function TransactionsTable(props) {

  const { transactions, txCountLocal, totalPage, currentPage, limit, setCurrentPage, setLimit } = props;
  const textColor = useColorModeValue("gray.700", "white");


  return (
    <>

      <Flex flexDir="column">
        <Text size="md" fontWeight="bold" ml={5} pb={5} color="gray.400"> {txCountLocal} total transactions </Text>
        <Table variant="simple" color={textColor} mb={6}>


          <Thead>
            <Tr my=".8rem" ps="0px">
              <Th color="gray.400">TX Hash</Th>
              <Th color="gray.400">Block Number</Th>
              <Th color="gray.400">Age</Th>
              <Th color="gray.400">From</Th>
              <Th color="gray.400">To</Th>
              <Th color="gray.400"> Value </Th>
            </Tr>
          </Thead>






          <Tbody>
            {transactions?.map((transaction, index) => {
              let value = toQuai(transaction.tx_value).toPrecision(4)
              return (
                <TransactionTableRow
                  transactionHash={transaction.hash}
                  toThisMiner={transaction.to_addr}
                  fromThisMiner={transaction.from_addr}
                  blockNumber={transaction.block_number}
                  blockHash={transaction.full_transaction.blockHash}
                  toLocation={transaction.to_location}
                  fromLocation={transaction.from_location}
                  value={value}
                  gweiValue={transaction.tx_value}
                  timestamp={transaction.tx_time}
                  key={index}
                />
              );
            })}
          </Tbody>

        </Table>
        {totalPage > 1 ?
          <Pagination
            currentPage={currentPage}
            totalCount={txCountLocal !== 0 ? txCountLocal : 0}
            pageSize={limit}
            onPageChange={page => setCurrentPage(page)}
            textColor={textColor}
          /> : null}
      </Flex>

    </>
  )
}

