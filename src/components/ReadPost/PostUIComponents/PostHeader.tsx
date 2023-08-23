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
import { useState, useContext } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";
import { RiArrowDropDownFill } from "react-icons/ri";
import { AppStateContext } from "../../AppStateContext";
import { any, number } from "zod";

interface PostHeaderProps {
  name: string | any;
  handleModalClose?: () => void;
  showCloseButton?: boolean; // New property
  post: string | any;
}

export const PostHeader = ({
  name,
  handleModalClose = () => {},
  showCloseButton = true, // Default to true if not provided
  post,
}: PostHeaderProps) => {
  const [, { incrementDownloadCount }]: any = useContext(AppStateContext);

  const [selectedDownloadOption, setSelectedDownloadOption] = useState("Small");

  const handleDownloadOptionClick = (option: string) => {
    setSelectedDownloadOption(option);

    let sizeParams = "";
    switch (option) {
      case "Small":
        sizeParams = "&w=400&h=300";
        break;
      case "Medium":
        sizeParams = "&w=800&h=600";
        break;
      case "Large":
        sizeParams = "&w=1600&h=1200";
        break;
      default:
        sizeParams = ""; // Original size
        break;
    }

    const downloadUrl = `${post.image}?auto=format${sizeParams}`;

    const urlObject = new URL(downloadUrl);
    const pathname = urlObject.pathname; // Gets the path: /_MG_8226.jpg
    const imageName = pathname.split("/").pop();

    fetch(downloadUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = name + " " + imageName + " Infinite shades.jpg";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        // Increment the download count by calling the function from the context
        incrementDownloadCount({
          postId: post.id, // assuming the post object has an id property
          downloadCount: post.downloads + 1, // assuming post object has a downloads property
        });
      })
      .catch((error) =>
        console.error("An error occurred during download:", error)
      );
  };

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
                onClick={() => handleDownloadOptionClick("Original")}
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
                  <MenuItem onClick={() => handleDownloadOptionClick("Small")}>
                    Small
                  </MenuItem>
                  <MenuItem onClick={() => handleDownloadOptionClick("Medium")}>
                    Medium
                  </MenuItem>
                  <MenuItem onClick={() => handleDownloadOptionClick("Large")}>
                    Large
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDownloadOptionClick("Original")}
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
};

export default PostHeader;
