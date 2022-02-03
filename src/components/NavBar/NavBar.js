// Chakra Imports
import {
  Box,
  Button,
  useColorModeValue,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Text,
  useColorMode
} from "@chakra-ui/react";
import React from "react";
import { SearchIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import LogoBanner from "../../assets/images/QuaiLogoBanner.svg"
import LogoBannerGray from "../../assets/images/quaiLogoBannerGray.svg"

export default function NavBar(props) {
  const { onOpen } = props;
  const settingsRef = React.useRef();
  const { colorMode, toggleColorMode } = useColorMode();

  let mainTextColor = useColorModeValue("gray.700", "gray.200");
  let inputBgColor = useColorModeValue("white", "gray.800");
  let quaiOrangeColor = useColorModeValue("brand.300", "teal.300");
  let searchIconColor = useColorModeValue("gray.700", "gray.200");
  let navbarPosition = "fixed";

  let navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  
  let navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  let navbarBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  let navbarBorder = useColorModeValue("#FFFFFF", "rgba(255, 255, 255, 0.31)");

  return (
    <Flex
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter="blur(21px)"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      borderRadius="16px"
      display="flex"
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      pb="8px"
      right="30px"
      px={{
        sm: "15px",
        md: "0px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top="20px"
      w={{ sm: "calc(100vw - 60px)", xl: "calc(100vw - 120px)" }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
      >
        
          { colorMode === "light" ? 
          <Image 
            src={LogoBanner} 
            w={{
              sm: "100px",
              md: "100px",
              lg: "100px",
              xl: "100px"
            }}
            w={{
              sm: "50px",
              md: "50px",
              lg: "50px",
              xl: "50px"
            }}
            ml={2}
            mt={{
              sm: "5px",
              md: "5px"
            }}
            mb={2} 
            alt='logo'
            /> 
            : 
            <Image 
            src={LogoBannerGray} 
            w={{
              sm: "100px",
              md: "100px",
              lg: "100px",
              xl: "100px"
            }}
            w={{
              sm: "50px",
              md: "50px",
              lg: "50px",
              xl: "50px"
            }}
            ml={2}
            mt={{
              sm: "5px",
              md: "5px"
            }}
            mb={2} 
            alt='logo'
            /> 
          }
        
          
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <Flex
            pe={{ sm: "0px", md: "16px" }}
            w={{ sm: "100%", md: "auto" }}
            alignItems="center"
            flexDirection="row"
            mt={{
              sm: "5px",
              md: "10px",
              lg: "10px",
              xl: "5px"
            }}
          >
            <InputGroup
              cursor="pointer"
              bg={inputBgColor}
              borderRadius="15px"
              w={{
                sm: "100vw",
                md: "calc(100vw - 500px)",
                lg: "calc(100vw - 300px)",
                xl: "calc(100vw - 300px)"
              }}
              me={{ sm: "auto", md: "20px" }}
              _focus={{
                borderColor: { quaiOrangeColor },
              }}
              _active={{
                borderColor: { quaiOrangeColor },
              }}
              ml={4}
            >
              <InputLeftElement
                children={
                  <IconButton
                    bg="inherit"
                    borderRadius="inherit"
                    _hover="none"
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}
                    icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
                  ></IconButton>
                }
              />
              <Input
                fontSize="xs"
                py="11px"
                color={mainTextColor}
                placeholder="Search by Txn Hash/Block"
                borderRadius="inherit"
              />
            </InputGroup>
            

            <IconButton
              cursor="pointer"
              ms={{ base: "16px", xl: "0px" }}
              me="16px"
              ref={settingsRef}
              onClick={onOpen}
              
              w="40px"
              h="40px"
              icon={colorMode === "light" ? <MoonIcon />  : <SunIcon /> }
              onClick={toggleColorMode}
            />


          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
