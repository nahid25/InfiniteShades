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
  Popover,
  PopoverTrigger,
  PopoverContent,
  Center,
} from "@chakra-ui/react";
import { useState, useContext, useMemo } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";
import { RiArrowDropDownFill } from "react-icons/ri";
import { AppStateContext, User } from "../../AppStateContext";
import {
  FormNameInputUI,
  FormSubmitButtonUI,
} from "../../shared/FormComponents";
import { useFormValidation } from "../../shared/Hooks/useFormHandler";
import { useLike } from "../../shared/Hooks/useLikePost";

interface PostHeaderProps {
  name: string | any;
  handleModalClose?: () => void;
  showCloseButton?: boolean; // New property
  post: any;
}

export const PostHeader = ({
  name,
  handleModalClose = () => {},
  showCloseButton = true, // Default to true if not provided
  post,
}: PostHeaderProps) => {
  const [{ posts }, , { incrementDownloadCount, createData, setLike }]: any =
    useContext(AppStateContext);

  const memoPosts = useMemo(() => {
    return posts[post?.id];
  }, [posts]);

  // const isLiked = (memoPosts?.likes || []).find(
  //   (_: any) => _ === localStorage.getItem("UserID")
  // );

  //Check if Name and Id Exist.
  const hasNameAndId = () => {
    const getID = localStorage.getItem("UserID");
    const getName = localStorage.getItem("UserName");
    return !!(getID && getName);
  };

  const { isLiked: isPostLiked, handleLike: handlePostLike } = useLike({
    postId: post.id,
    postUserId: post.userId,
    data: { name },
  });

  const handleLike = (data?: any) => {
    if (hasNameAndId()) {
      handlePostLike();
    } else {
      // create new user and then like
      let userId =
        data?.name.slice(0, 3) + Math.random().toString(36).substr(2, 3);
      let name = data?.name;
      console.log("userId:", userId); // Log the value of 'userId' here
      const newUser: User = {
        id: userId,
        name: name,
        email: "",
      };
      localStorage.setItem("UserID", userId);
      localStorage.setItem("UserName", name);
      createData("users", userId, "", newUser);
      // like the post
      setLike({
        postId: post.id as string,
        like: true,
        postUserId: post.userId,
      });
    }
  };

  // useFormValidation custom hook for form validation
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormValidation(hasNameAndId(), true, true);

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
          downloadCount: (post.downloads || 0) + 1, // assuming post object has a downloads property
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
            {hasNameAndId() ? (
              <Button
                size="sm"
                variant="outline"
                onClick={handleLike}
                leftIcon={isPostLiked ? <AiFillLike /> : <AiOutlineLike />}
              ></Button>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<AiOutlineLike />}
                  ></Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Box px={2} pb={1}>
                    <FormNameInputUI register={register} error={errors.name} />
                    <Center>
                      <FormSubmitButtonUI
                        onSubmit={handleSubmit(handleLike)}
                        content={"Submit"}
                      />
                    </Center>
                  </Box>
                </PopoverContent>
              </Popover>
            )}
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
