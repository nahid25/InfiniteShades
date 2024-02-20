import { Box, Text, Link, HStack, Spacer } from "@chakra-ui/react";
import { SiPostcss } from "react-icons/si";
import {
  AiFillInstagram,
  AiFillMediumSquare,
  AiFillLinkedin,
} from "react-icons/ai";
import {memo} from 'react';

const Footer = memo(() => {
  return (
    <>
      <Box as="footer" role="contentinfo" py="6" px={{ base: "4", md: "8" }}>
        <HStack justify={"space-between"}>
          <SiPostcss size={20} />
          <Text fontSize={"sm"}>Infinite Shades</Text>

          <Spacer />

          <HStack spacing={5}>
            <Link href="https://www.instagram.com/_nahid.ekon/" target="_blank">
              <AiFillInstagram size={20} />
            </Link>
            <Link href="https://medium.com/@nahidekon314" target="_blank">
              <AiFillMediumSquare size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/nahidul-ekon/"
              target="_blank"
            >
              <AiFillLinkedin size={20} />
            </Link>
          </HStack>
        </HStack>
        <Box p={2}>
          <Text fontSize="sm" color="gray.500">
            &copy; {new Date().getFullYear()} Nahidul Ekon. All rights reserved.
          </Text>
        </Box>
      </Box>
    </>
  );
});

export default Footer;
