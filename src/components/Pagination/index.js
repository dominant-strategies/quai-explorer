import React from 'react'

import {
    Flex,
    IconButton,
    Spacer,
    Text,
    Input,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default function Pagination({ currentPage, setCurrentPage, limit, setLimit, totalPage, dimensions }) {

    if (window.innerWidth > 670) {
        return (
            <Flex w={dimensions} alignItems="center"
                ml={6}
                mt={10}
                borderColor="brand.300"
                borderRadius="16px"
                boxShadow="0px 7px 23px rgba(0, 0, 0, 0.05)"


            >
                <IconButton
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    cursor="pointer"
                    icon={<ArrowBackIcon />}
                />

                <Spacer />
                <Text fontSize="sm"> Page  </Text>
                <Spacer />
                <Input
                    value={currentPage}
                    onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                    borderRadius="inherit"
                    w={{
                        sm: "20%",
                        md: "25%",
                        lg: "20%",
                        xl: "15%"
                    }}
                    focusBorderColor="brand.300"
                />

                <Spacer />
                <Text fontSize="sm"> of {totalPage}  </Text>

                <Spacer />

                <IconButton
                    onClick={() => currentPage < totalPage && setCurrentPage(currentPage + 1)}
                    cursor="pointer"
                    icon={<ArrowForwardIcon />}
                />
            </Flex>
        )
    }
    else {
        return (
            <Flex
                flexDirection="column"
                ml={6}
                mt={10}
                borderColor="brand.300"
                borderRadius="16px"
                boxShadow="0px 7px 23px rgba(0, 0, 0, 0.05)"
            >
                <IconButton
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    cursor="pointer"
                    icon={<ArrowBackIcon />}
                    w="20vw"
                />

                <Spacer />
                <Text fontSize="sm"> Page  </Text>
                <Spacer />
                <Input
                    value={currentPage}
                    onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                    borderRadius="inherit"
                    w={{
                        sm: "20%",
                        md: "25%",
                        lg: "20%",
                        xl: "15%"
                    }}
                    focusBorderColor="brand.300"
                />

                <Spacer />
                <Text fontSize="sm"> of {totalPage}  </Text>

                <Spacer />

                <IconButton
                    onClick={() => currentPage < totalPage && setCurrentPage(currentPage + 1)}
                    cursor="pointer"
                    icon={<ArrowForwardIcon />}
                    w="20vw"
                />
            </Flex>
        )
    }
}
