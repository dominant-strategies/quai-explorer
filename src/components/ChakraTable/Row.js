import { Td } from '@chakra-ui/react'

function Row({ item, columns, wireframe, ...props }) {
    if (wireframe) {
        return columns.map((column) => (
            <Td key={column.id || column.header}>{column.wireframe}</Td>
        ))
    }

    return columns.map((column) => (
        <Td key={column.id || column.header}>
            {column.accessor({ ...item, ...props })}
        </Td>
    ))
}

export default Row
