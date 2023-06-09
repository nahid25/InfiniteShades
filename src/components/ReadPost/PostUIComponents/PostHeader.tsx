import {
  Avatar,
  Flex,
  HStack,
  Stack,
  Text,
  Icon,
  Button,
  CloseButton,
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
  handleModalClose?: () => void;
  showCloseButton?: boolean; // New property
}

export const PostHeader = ({
  name,
  handleModalClose = () => {},
  showCloseButton = true, // Default to true if not provided
}: PostHeaderProps) => {
  return (
    <>
      <Flex justify="space-between" align="center" p={2}>
        <Flex align="center">
          <HStack>
            <Stack pl={1}>
              <Flex>
                <Avatar name={name} src="" color="white" size={["xs", "sm"]} />
                <Box ml="3">
                  <Text fontWeight="bold" fontSize={["md", "sm"]}>
                    {name}
                    <Badge ml="1" colorScheme="">
                      <Icon as={CgDanger} />
                    </Badge>
                  </Text>
                  <Text fontSize={"xs"}>Unverified</Text>
                </Box>
              </Flex>
            </Stack>
          </HStack>
        </Flex>
        <Flex align="center">
          <HStack>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<AiOutlineLike />}
            ></Button>
            <HStack justifyContent="flex-end" spacing="0">
              <Button
                colorScheme="green"
                size={["md", "sm"]}
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
                    size={["md", "sm"]}
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
            {showCloseButton && (
              <CloseButton
                as={Button}
                size={["md", "lg"]}
                variant="ghost"
                onClick={handleModalClose}
              ></CloseButton>
            )}
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default PostHeader;
