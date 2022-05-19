import { Tr, Td } from '@chakra-ui/react'
import Row from './Row'

function Body({ columns, data, rowProps, wireframe, wireframeRows }) {
    if (wireframe) {
        const emptyRows = Array(wireframeRows).fill(0)

        return emptyRows.map((_, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <Tr key={key}>
                {columns.map((column, columnKey) => (
                    <Td
                        flexDirection="column"
                        align="center"
                        justifyContent="center"
                        minW="150px"
                        // eslint-disable-next-line react/no-array-index-key
                        key={columnKey}
                    >
                        {column.wireframe}
                    </Td>
                ))}
            </Tr>
        ))
    }

    return data.map((item, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <Tr key={key}>
            <Row item={item} columns={columns} {...rowProps} />
        </Tr>
    ))
}

export default Body
