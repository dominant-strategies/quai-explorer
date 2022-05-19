import { Flex, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react'
import Pagination from '../Pagination'
// import Row from './Row'
import Body from './Body'

function ChakraTable({
    headerText,
    tableColor,
    columns,
    currentPage,
    totalCount,
    pageSize,
    onPageChange,
    totalPage,
    data,
    rowProps,
    wireframe,
    wireframeRows,
}) {
    return (
        <Flex flexDir="column">
            <Text size="md" fontWeight="bold" ml={5} pb={5} color="gray.400">
                {' '}
                {headerText}{' '}
            </Text>
            <Table variant="simple" color={tableColor}>
                <Thead>
                    <Tr my=".8rem" pl="0px" color="gray.400">
                        {columns.map(({ id, header, color = 'gray.400' }) => (
                            <Th key={id || header} color={color}>
                                {header}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    <Body
                        columns={columns}
                        data={data}
                        rowProps={rowProps}
                        wireframe={wireframe}
                        wireframeRows={wireframeRows}
                    />
                </Tbody>
            </Table>

            {totalPage > 1 ? (
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                />
            ) : null}
        </Flex>
    )
}

export default ChakraTable
