import { Box, Flex } from "@chakra-ui/react";
import PostImage from "../PostUIComponents/PostImage";
import { Post, useAppState } from "../../AppStateContext";
import Layout from "../../shared/Layout";
import { useParams } from "react-router-dom";
import PostMobileHeader from "./PostMobileHeader";
import "./PostPage.css";
import PostMobileStats from "./PostMobileStats";
import PostMobileGuide from "./PostMobileGuide";
import PostMobileComment from "./PostMobileComment";
import { useEffect, useState } from "react";
import MasonryMobileItemSkeleton from "./MasonryMobileItemSkeleton";

const PostPage = () => {
  const { postId, userId } = useParams<{ postId: string; userId: string }>();
  const [{}, dispatch, { fetchData }] = useAppState();
  const [postData, setPostData] = useState<Post | null>(null);

  useEffect(() => {
    fetchData(`posts/${userId}-${postId}`, "SET_POSTS").then((post: Post) => {
      setPostData(post);
    });
  }, [postId, userId]);

  if (!postData) {
    // Show a loading indicator or a message if the post data is not available yet
    return (
      <>
        <Layout>
          <MasonryMobileItemSkeleton />
        </Layout>
      </>
    );
  }

  return (
    <Layout>
      <Flex direction="column" align="center">
        <Box
          w="full"
          bg="white"
          boxShadow="sm"
          rounded="lg"
          p={6}
          overflow="hidden"
          mt={6}
        >
          <PostMobileHeader name={postData?.userName ?? ""} />
          <PostImage
            image={postData?.image ?? ""}
            imageWidth={postData?.dimension.width ?? 0}
            imageHeight={postData?.dimension.height ?? 0}
          />
          <PostMobileStats
            message={postData?.postMessage ?? ""}
            postDate={postData?.dateUpdated ?? ""}
          />
          <PostMobileGuide />
          <PostMobileComment />
        </Box>
      </Flex>
    </Layout>
  );
};

export default PostPage;
