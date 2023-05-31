import { useEffect, useState } from "react";
import { Box, Flex, Avatar, Button, useDisclosure } from "@chakra-ui/react";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useAppState, Post } from "../AppStateContext";
import PostModal from "./PostModal/PostModal";
import { useNavigate } from "react-router-dom";
import MasonryItemSkeleton from "./MasonryItemSkeleton";

const ResponsiveLayout = () => {
  const [{ posts }, dispatch, { fetchData }] = useAppState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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

  const handleImageClick = (post: Post) => {
    if (isMobileDevice) {
      navigate(`/post/${post.id}/${post.userId}`);
    } else {
      console.log(post);
      setSelectedPost(post);
      onOpen();
    }
  };

  return (
    <>
      <Box p={8} sx={{ width: "100%", height: "100%", overflow: "auto" }}>
        <ImageList variant="masonry" cols={cols} gap={8}>
          {Object.values(posts).length === 0
            ? Array(10)
                .fill(null)
                .map((_, index) => <MasonryItemSkeleton key={index} />) // Display skeleton if there are no posts
            : Object.values(posts)
                .sort(
                  (a: Post, b: Post) =>
                    new Date(b.dateUpdated).getTime() -
                    new Date(a.dateUpdated).getTime()
                )
                .map((post: Post, index) => (
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
                        <Avatar name={post.userId} color="white" size="md" />
                      </Flex>
                      <Flex p="4">
                        <Button variant="solid" leftIcon={<AiOutlineLike />} />
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
                ))}
        </ImageList>
      </Box>
      <PostModal isOpen={isOpen} onClose={onClose} post={selectedPost} />
    </>
  );
};

export default ResponsiveLayout;
