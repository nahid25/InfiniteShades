import { useContext, useEffect, useMemo, useState } from "react";
import { Box, Flex, Avatar, Button, useDisclosure } from "@chakra-ui/react";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiFillLike,
} from "react-icons/ai";
import {
  useAppState,
  Post,
  ViewCountIncrementPayload,
  AppStateContext,
  User,
} from "../AppStateContext";
import PostModal from "./PostModal/PostModal";
import { useNavigate } from "react-router-dom";
import MasonryItemSkeleton from "./MasonryItemSkeleton";
import { useTagContext } from "../TagContext";

const ResponsiveLayout = () => {
  const [
    { posts },
    dispatch,
    { fetchData, incrementViewCount, createData, setLike },
  ] = useAppState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { selectedTag, setSelectedTag } = useTagContext();

  const likePopoverDisclosure = useDisclosure();
  const navigate = useNavigate();
  const isMobileDevice = useMediaQuery("(max-width:600px)");

  const matchesSM = useMediaQuery("(max-width:600px)");
  const matchesMD = useMediaQuery("(min-width:600px) and (max-width:1200px)");
  const matchesLG = useMediaQuery("(min-width:1200px)");

  let cols;
  if (matchesSM) {
    cols = 1;
  } else if (matchesMD) {
    cols = 2;
  } else if (matchesLG) {
    cols = 3;
  }

  useEffect(() => {
    fetchData("posts", "SET_POSTS");
  }, []);

  //Check if Name and Id Exist.
  const hasNameAndId = () => {
    const getID = localStorage.getItem("UserID");
    const getName = localStorage.getItem("UserName");
    return !!(getID && getName);
  };

  const handleLike = (post: Post, data?: any) => {
    console.log("handleLike", post);
    const isLiked = (post?.likes || []).find(
      (_: any) => _ === localStorage.getItem("UserID")
    );

    if (hasNameAndId()) {
      setLike({
        postId: post.id as string,
        like: !isLiked,
        postUserId: post.userId,
      });
    } else {
      // create new user and then like
      let userId =
        data?.name.slice(0, 3) + Math.random().toString(36).substr(2, 3);
      let name = data?.name;
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

  const handleLikeClick = (post: Post, data?: any) => {
    if (!hasNameAndId()) {
      likePopoverDisclosure.onOpen();
    } else {
      handleLike(post, data);
    }
  };

  const handleImageClick = (post: Post) => {
    if (isMobileDevice) {
      navigate(`/post/${post.id}/${post.userId}`);
    } else {
      setSelectedPost(post);
      onOpen();
      // Call incrementViewCount here to increase the view count
      const payload: ViewCountIncrementPayload = {
        postId: post.id,
        viewCount: post.views + 1,
      };
      incrementViewCount(payload);
    }
  };

  return (
    <>
      <Box p={8} sx={{ width: "100%", height: "100%", overflow: "auto" }}>
        <ImageList variant="masonry" cols={cols} gap={8}>
          {Object.values(posts)
            .filter(
              (post) =>
                selectedTag === null ||
                (post.tags && post.tags.includes(selectedTag))
            ) // Filter posts based on selected tag
            .sort(
              (a: Post, b: Post) =>
                new Date(b.dateUpdated).getTime() -
                new Date(a.dateUpdated).getTime()
            )
            .map((post: Post, index) => {
              const isLiked = (post?.likes || []).includes(
                localStorage.getItem("UserID") || ""
              );

              return (
                <ImageListItem
                  key={index}
                  onClick={() => handleImageClick(post)}
                >
                  <img
                    src={`${post.image}?w=500&fit=crop&auto=format`}
                    srcSet={`${post.image}?w=500&fit=crop&auto=format&dpr=2 2x`}
                    loading="lazy"
                  />
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="rgba(0, 0, 0, 0.3)"
                    opacity="0"
                    _hover={{ opacity: "1" }}
                    transition="opacity 0.3s"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    <Flex p="4">
                      <Avatar name={post.userName} color="white" size="md" />
                    </Flex>
                    <Flex p="4">
                      <Button
                        variant="solid"
                        leftIcon={isLiked ? <AiFillLike /> : <AiOutlineLike />}
                        onClick={() => handleLikeClick(post)}
                      />
                      <Button
                        variant="solid"
                        leftIcon={<AiOutlineComment />}
                        ml="2"
                      />
                      <Button
                        variant="solid"
                        leftIcon={<AiOutlineShareAlt />}
                        ml="2"
                      />
                    </Flex>
                  </Box>
                </ImageListItem>
              );
            })}
        </ImageList>
      </Box>
      <PostModal isOpen={isOpen} onClose={onClose} post={selectedPost} />
    </>
  );
};

export default ResponsiveLayout;
