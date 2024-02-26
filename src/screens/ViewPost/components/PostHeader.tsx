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
import { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";
import { RiArrowDropDownFill } from "react-icons/ri";
import { DownloadOption, downloadImage } from "../../../utils/utils";
import { Post } from "../../../models/Post";
import { memo } from 'react';
import { useLikes } from "../../../services/db";
import { PrimaryButton } from "../../../components/Button";

interface PostHeaderProps {
  name: string | any;
  handleModalClose?: () => void;
  showCloseButton?: boolean; // New property
  post: Post;
}

export const PostHeader = memo(({
  name,
  handleModalClose = () => { },
  showCloseButton = true, // Default to true if not provided
  post,
}: PostHeaderProps) => {

  const [ ,setSelectedDownloadOption] = useState<DownloadOption | undefined>(DownloadOption.Small);

  const { liked, toggleLike } = useLikes(post.id);

  const handleDownloadOptionClick = (option?: DownloadOption) => {
    setSelectedDownloadOption(option);
    downloadImage(post.id, post.image, option);
  };

  return (
    <>
      <Flex justify="space-between" align="center" p={2}>
        <Flex align="center">
          <HStack>
            <Stack pl={1}>
              <Flex>
                <Avatar name={name} src="" color="white" size={["xs", "sm"]} />
              <PrimaryButton buttonText={"Home"} _disabled={true} />
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
            {liked ? <Button
              onClick={toggleLike}
              size="sm"
              variant="outline"
              leftIcon={<AiFillLike />}
            /> :
              <Button
                onClick={toggleLike}
                size="sm"
                variant="outline"
                leftIcon={<AiOutlineLike />}
              />}
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
                onClick={() => handleDownloadOptionClick()}
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
                  <MenuItem onClick={() => handleDownloadOptionClick(DownloadOption.Small)}>
                    Small
                  </MenuItem>
                  <MenuItem onClick={() => handleDownloadOptionClick(DownloadOption.Medium)}>
                    Medium
                  </MenuItem>
                  <MenuItem onClick={() => handleDownloadOptionClick(DownloadOption.Large)}>
                    Large
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDownloadOptionClick()}
                  >
                    Original
                  </MenuItem>
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
});

export default PostHeader;
