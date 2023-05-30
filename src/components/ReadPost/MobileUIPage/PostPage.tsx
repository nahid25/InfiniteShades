import { Box, Flex } from "@chakra-ui/react";
import PostComment from "../PostUIComponents/PostComment";
import PostGuide from "../PostUIComponents/PostGuide";
import PostHeader from "../PostUIComponents/PostHeader";
import PostImage from "../PostUIComponents/PostImage";
import PostStats from "../PostUIComponents/PostStats";
import { useAppState } from "../../AppStateContext";
import Layout from "../../shared/Layout";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postId, userId } = useParams<{ postId: string; userId: string }>();
  const [{ posts }] = useAppState();
  // combine userId and postId to access the post in the state
  const postData = posts[`${userId}-${postId}`];

  if (!postData) {
    // Show a loading indicator or a message if the post data is not available yet
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: "1200px" }}
        m="0 auto"
      >
        <Box
          w="full"
          bg="white"
          boxShadow="sm"
          rounded="lg"
          p={6}
          overflow="hidden"
          mt={6}
        >
          <PostHeader name={postData.userName} />
          <PostImage
            image={postData.image}
            imageWidth={postData.dimension.width}
            imageHeight={postData.dimension.height}
          />
          <PostStats
            message={postData.postMessage}
            postDate={postData.dateUpdated}
          />
          <PostGuide />
          <PostComment />
        </Box>
      </Flex>
    </Layout>
  );
};

export default PostPage;
