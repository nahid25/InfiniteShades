import PostHeader from "../PostUIComponents/PostHeader";
import PostImage from "../PostUIComponents/PostImage";
import PostStats from "../PostUIComponents/PostStats";
import PostGuide from "../PostUIComponents/PostGuide";
import PostComment from "../PostUIComponents/PostComment";
import "./PostModal.css";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Flex,
  Grid,
} from "@chakra-ui/react";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: any | null;
}

const PostModal = ({ isOpen, onClose, post }: PostModalProps) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onClose={onClose}
        size={"6xl"}
      >
        <ModalOverlay />
        <ModalContent h="100vh">
          <ModalHeader></ModalHeader>
          <ModalBody overflow={"auto"}>
            <Grid templateRows="1fr 3fr auto auto" h="60vh" gap={4}>
              {/* Post header section */}
              <Box>
                <PostHeader
                  name={post?.userName}
                  handleModalClose={onClose}
                  post={post}
                />
              </Box>
              {/* Post body image section */}
              <Box mr={2}>
                <PostImage
                  image={post?.image}
                  imageWidth={post?.dimension.width}
                  imageHeight={post?.dimension.height}
                />
              </Box>
              {/* Post section post modal */}
              <Flex direction={["column", "column", "row"]} mt={5}>
                <PostStats
                  message={post?.postMessage}
                  postDate={post?.dateUpdated}
                  viewCount={post?.views}
                  downloadCount={post?.downloads || 0}
                  commentsCount={post?.commentsCount || 0}
                  likesCount={post?.likes.length || 0}
                />
              </Flex>
              <Box>
                {/* Post Guide */}
                <PostGuide />
              </Box>
              {/* Post Comment */}
              <Box>
                <PostComment postId={post?.id} userId={post?.userId} />
              </Box>
            </Grid>
          </ModalBody>
          <ModalFooter m={5}></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostModal;
