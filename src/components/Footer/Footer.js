import React from 'react'
import {
  Box,
  Container,
  Stack,
  HStack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaDiscord, FaMedium, FaGlobe } from 'react-icons/fa';

export default function Footer() {

  const socialMediaButtonHeightAndWeight = 12;

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'calc(100vw - 50px)'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>

          <Text pl={{ xl: '10', lg: '10', md: '0', sm: '0' }}>© 2022 Dominant Strategies. All rights reserved</Text>
          
          <Stack direction={'row'} spacing={4}>
            <Button
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              rounded={'full'}
              w={socialMediaButtonHeightAndWeight}
              h={socialMediaButtonHeightAndWeight}
              cursor={'pointer'}
              as={'a'}
              href="https://twitter.com/QuaiNetwork"
              display={'inline-flex'}
              alignItems={'center'}
              justifyContent={'center'}
              transition={'background 0.3s ease'}
              _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
              }}>
              <VisuallyHidden>Twitter</VisuallyHidden>
              <FaTwitter />
            </Button>

            <Button
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              rounded={'full'}
              w={socialMediaButtonHeightAndWeight}
              h={socialMediaButtonHeightAndWeight}
              cursor={'pointer'}
              as={'a'}
              href="https://discord.com/invite/ngw88VXXnV"
              display={'inline-flex'}
              alignItems={'center'}
              justifyContent={'center'}
              transition={'background 0.3s ease'}
              _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
              }}>
              <VisuallyHidden>Discord</VisuallyHidden>
              <FaDiscord />
            </Button>

            <Button
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              rounded={'full'}
              w={socialMediaButtonHeightAndWeight}
              h={socialMediaButtonHeightAndWeight}
              cursor={'pointer'}
              as={'a'}
              href="https://www.youtube.com/channel/UCA7wfK91O1CmwHm4LELnNHw"
              display={'inline-flex'}
              alignItems={'center'}
              justifyContent={'center'}
              transition={'background 0.3s ease'}
              _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
              }}>
              <VisuallyHidden>Youtube</VisuallyHidden>
              <FaYoutube />
            </Button>

            <Button
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              rounded={'full'}
              w={socialMediaButtonHeightAndWeight}
              h={socialMediaButtonHeightAndWeight}
              cursor={'pointer'}
              as={'a'}
              href="https://medium.com/@QuaiNetwork"
              display={'inline-flex'}
              alignItems={'center'}
              justifyContent={'center'}
              transition={'background 0.3s ease'}
              _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
              }}>
              <VisuallyHidden>Medium</VisuallyHidden>
              <FaMedium />
            </Button>

            <Button
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              rounded={'full'}
              w={socialMediaButtonHeightAndWeight}
              h={socialMediaButtonHeightAndWeight}
              cursor={'pointer'}
              as={'a'}
              href="https://quai.network/"
              display={'inline-flex'}
              alignItems={'center'}
              justifyContent={'center'}
              transition={'background 0.3s ease'}
              _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
              }}>
              <VisuallyHidden>Website</VisuallyHidden>
              <FaGlobe />
            </Button>


          </Stack>
        </Container>
      </Box>
    </Box>
  );
}