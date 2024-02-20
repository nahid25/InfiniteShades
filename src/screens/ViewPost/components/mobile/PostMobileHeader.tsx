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
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";
import { RiArrowDropDownFill } from "react-icons/ri";
import { Post } from "../../../../models/Post";
import { useLikes } from "../../../../services/db";
import { DownloadOption, downloadImage } from "../../../../utils/utils";
import { memo } from "react";

interface PostHeaderProps {
  post: Post;
}

export const PostMobileHeader = ({ post }: PostHeaderProps) => {

  const { liked, toggleLike } = useLikes(post.id);

  const handleDownloadOptionClick = (option?: DownloadOption) => {
    downloadImage(post.id, post.image, option);
  };

  return (
    <>
      <Box width="100%" pb={5}>
        <HStack>
          <Stack pl={1}>
            <Flex>
              <Avatar name={post.userName} src="" color="white" size="sm" />
              <Box ml="3">
                <Text fontWeight="bold" fontSize="sm">
                  {post.userName}
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
        </Flex>
        <Flex>
          <HStack spacing={0}>
            <Button
              onClick={() => handleDownloadOptionClick()}
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
                <MenuItem onClick={() => handleDownloadOptionClick(DownloadOption.Small)}>Small</MenuItem>
                <MenuItem onClick={() => handleDownloadOptionClick(DownloadOption.Medium)}>Medium</MenuItem>
                <MenuItem onClick={() => handleDownloadOptionClick(DownloadOption.Large)}>Large</MenuItem>
                <MenuItem onClick={() => handleDownloadOptionClick()}>Original</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default memo(PostMobileHeader);
