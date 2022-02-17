import React, { Component } from 'react'

import {
    Flex,
    IconButton,
    Spacer,
    Text,
    Container,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

export default class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    goToFirstPage = () => {
        const { setCurrentPage } = this.props;
        setCurrentPage(1);
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

    goToLastPage = () => {
        const { setCurrentPage, totalPage } = this.props;
        setCurrentPage(totalPage);
    }

    preventBackSpace = (e) => {
        if (e.keyCode === 8) {
            return;
        }
    }

    onChangeInput = (event) => {
        const { setCurrentPage } = this.props;

        console.log(event.key)

        if (!isNaN(event.target.value)) {
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
                >
                    <IconButton
                        onClick={this.goToFirstPage}
                        cursor="pointer"
                        icon={<ArrowLeftIcon h="2" w="2" />}
                        aria-label="First page"
                    />

                    <Spacer />

                    <IconButton
                        onClick={this.goToPreviousPage}
                        cursor="pointer"
                        icon={<ArrowBackIcon />}
                        aria-label="Previous page"
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
                        aria-label="Next page"
                    />

                    <Spacer />

                    <IconButton
                        onClick={this.goToLastPage}
                        cursor="pointer"
                        icon={<ArrowRightIcon h="2" w="2" />}
                        aria-label="Last page"
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
                        onClick={this.goToFirstPage}
                        cursor="pointer"
                        icon={<ArrowLeftIcon h="2" w="2" />}
                        aria-label="First page"
                        w="20vw"
                        mb={3}
                    />

                    <Spacer />

                    <IconButton
                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                        cursor="pointer"
                        icon={<ArrowBackIcon />}
                        w="20vw"
                        mb={3}
                    />

                    <Container ml={3}>

                        <Spacer />
                        <Text fontSize="sm"> Page  </Text>
                        <Spacer />
                        <Text fontSize="xl" fontWeight="bold" ml={3}> {currentPage}  </Text>

                        <Spacer />
                        <Text fontSize="sm"> of {totalPage}  </Text>

                        <Spacer />

                    </Container>



                    <IconButton
                        onClick={() => currentPage < totalPage && setCurrentPage(currentPage + 1)}
                        cursor="pointer"
                        icon={<ArrowForwardIcon />}
                        w="20vw"
                        mt={3}
                    />

                    <Spacer />

                    <IconButton
                        onClick={this.goToLastPage}
                        cursor="pointer"
                        icon={<ArrowRightIcon h="2" w="2" />}
                        w="20vw"
                        aria-label="Last page"
                        mt={3}
                    />
                </Flex>

               

       
            )
        }
    }
}
