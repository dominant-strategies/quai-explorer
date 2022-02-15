import React, { Component } from 'react'

import {
    Flex,
    IconButton,
    Spacer,
    Text,
    Input,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    goToPreviousPage = () => {
        const { refetchData, currentPage, setCurrentPage } = this.props;
        currentPage > 1 && setCurrentPage(currentPage - 1)
        refetchData();
    }

    goToNextPage = () => {
        const { refetchData, currentPage, setCurrentPage, totalPage } = this.props;
        currentPage < totalPage && setCurrentPage(currentPage + 1);
        refetchData();
    }

    preventBackSpace = (e) => {
        if (e.keyCode === 8) {
            return;
        }
    }

    onChangeInput = (event) => {
        const { setCurrentPage } = this.props;

        console.log(event.key)

        if(!isNaN(event.target.value)) {
            if (event.key !== 'Backspace' || event.key !== 'Delete') {
                setCurrentPage(parseInt(event.target.value));
            }
        }
    }



    render() {

        const { currentPage, setCurrentPage, totalPage, dimensions } = this.props;

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
                        onClick={this.goToPreviousPage}
                        cursor="pointer"
                        icon={<ArrowBackIcon />}
                    />

                    <Spacer />
                    <Text fontSize="sm"> Page  </Text>
                    <Spacer />
                    <Text fontSize="xl" fontWeight="bold"> {currentPage}  </Text>

                    <Spacer />
                    <Text fontSize="sm"> of {totalPage}  </Text>

                    <Spacer />

                    <IconButton
                        onClick={this.goToNextPage}
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
}
