import {
  Avatar,
  Flex,
  HStack,
  Stack,
  Text,
  Icon,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  Box,
  Badge,
} from "@chakra-ui/react";
import { AiOutlineLike } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";
import { RiArrowDropDownFill } from "react-icons/ri";

interface PostHeaderProps {
  name: string | any;
}

export const PostMobileHeader = ({ name }: PostHeaderProps) => {
  return (
    <>
      <Box width="100%" pb={5}>
        <HStack>
          <Stack pl={1}>
            <Flex>
              <Avatar name={name} src="" color="white" size="sm" />
              <Box ml="3">
                <Text fontWeight="bold" fontSize="sm">
                  {name}
                  <Badge ml="1" colorScheme="">
                    <Icon as={CgDanger} />
                  </Badge>
                </Text>
                <Text fontSize="xs">Unverified</Text>
              </Box>
            </Flex>
          </Stack>
        </HStack>
      </Box>
      <Flex justify="space-between" pb={5}>
        <Flex>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<AiOutlineLike />}
          ></Button>
        </Flex>
        <Flex>
          <HStack spacing={0}>
            <Button
              colorScheme="green"
              size="sm"
              borderRadius="5px 0 0 5px"
              _hover={{
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: "1px",
              }}
              _focus={{ boxShadow: "none" }}
            >
              Download
            </Button>
            <Menu>
              <Tooltip hasArrow bg="gray.300" color="black">
                <MenuButton
                  as={Button}
                  colorScheme="green"
                  size="sm"
                  borderRadius="0 5px 5px 0"
                  _hover={{
                    borderColor: "black",
                    borderStyle: "solid",
                    borderWidth: "1px",
                  }}
                  _focus={{ boxShadow: "none" }}
                >
                  <RiArrowDropDownFill color="white" />
                </MenuButton>
              </Tooltip>
              <MenuList fontSize={"sm"}>
                <MenuItem>Small</MenuItem>
                <MenuItem>Medium</MenuItem>
                <MenuItem>Large</MenuItem>
                <MenuItem>Original</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default PostMobileHeader;
