import { Flex, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Pagination from '../Pagination';
import BlockTableRow from "../TableRows/BlockTableRow";




export default function BlockTable(props) {
  const { blocks, limit, totalPage, currentPage, blocksCountLocal, firstBlockNumber, lastBlockNumber, setCurrentPage, setLimit } = props
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <>

      <Flex flexDir="column">

        <Text size="md" fontWeight="bold" ml={5} pb={5} color="gray.400"> Block {firstBlockNumber} to Block {lastBlockNumber} of {blocksCountLocal} blocks </Text>

        <Table variant="simple" color={textColor}>

          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              <Th color="gray.400">Block</Th>
              <Th color="gray.400">Location</Th>
              <Th color="gray.400">Age</Th>
              <Th color="gray.400">Txs</Th>
              <Th color="gray.400">Uncles</Th>
              <Th color="gray.400">Miner</Th>
              <Th color="gray.400">Gas Used</Th>
              <Th color="gray.400">Gas Limit</Th>
            </Tr>
          </Thead>


          <Tbody>
            {blocks?.map((block, index) => {
              return (
                <BlockTableRow
                  location={block.location}
                  blockNumber={block.number}
                  minerAddress={block.miner}
                  timestamp={block.timestamp}
                  hash={block.hash}
                  gasUsed={block.gasUsed}
                  gasLimit={block.gasLimit}
                  age={block.age}
                  transactions={block.transactions}
                  uncles={block.uncles}
                  key={index}
                />
              );
            })}
          </Tbody>
        </Table>


        {totalPage > 1 ? (
          <Pagination
            currentPage={currentPage}
            totalCount={
              blocksCountLocal != 0
                ? blocksCountLocal
                : 0
            }
            pageSize={limit}
            onPageChange={(page) =>
              setCurrentPage(page)
            }
            textColor={textColor}
          />
        ) : null}

      </Flex>
    </>
  )
}


