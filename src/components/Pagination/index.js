import {
    ArrowBackIcon,
    ArrowForwardIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
} from '@chakra-ui/icons'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

const DOTS = '...'

const range = (start, end) => {
    const length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start)
}

const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize)

        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5

        /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount)
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount,
        )

        /*
      We do not want to show dots if there is only one position left
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

        const firstPageIndex = 1
        const lastPageIndex = totalPageCount

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount
            const leftRange = range(1, leftItemCount)

            return [...leftRange, DOTS, totalPageCount]
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount
            const rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount,
            )
            return [firstPageIndex, DOTS, ...rightRange]
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex)
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }

        return false
    }, [totalCount, pageSize, siblingCount, currentPage])

    return paginationRange
}

function Pagination(props) {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    })

    if (currentPage === 0 || paginationRange.length < 2) {
        return null
    }

    const onNext = () => {
        onPageChange(currentPage + 1)
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1)
    }

    const lastPage = paginationRange[paginationRange.length - 1]

    console.log('paginationRange: ', paginationRange)

    return (
        <Flex justifyContent="space-between" m={4} alignItems="center">
            <Button
                leftIcon={<ArrowLeftIcon />}
                disabled={currentPage < 2}
                onClick={() => onPageChange(1)}
            >
                {' '}
                First{' '}
            </Button>
            <Button
                leftIcon={<ArrowBackIcon />}
                disabled={currentPage < 2}
                onClick={() => onPrevious()}
            >
                {' '}
                Back{' '}
            </Button>
            <Text size="sm"> Page </Text>{' '}
            <Heading size="md" fontWeight="bold" as="u">
                {' '}
                {currentPage}{' '}
            </Heading>
            <Button
                rightIcon={<ArrowForwardIcon />}
                disabled={currentPage === lastPage}
                onClick={() => onNext()}
            >
                {' '}
                Next{' '}
            </Button>
            <Button
                leftIcon={<ArrowRightIcon />}
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(lastPage)}
            >
                {' '}
                Last{' '}
            </Button>
        </Flex>
    )
}

export default Pagination
