import { useEffect, useState, memo, useCallback, useRef } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ImageList, ImageListItem } from "@mui/material";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Post } from "../../../models/Post";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { StatType, getPosts, incrementStats } from "../../../services/db";
import MasonryItemSkeleton from "./MasonryItemSkeleton";
import InfiniteScroll from "react-infinite-scroller";
import { useMediaQueryHook } from "../../../utils/MediaQuery";
import PostModal from "../../ViewPost/modal/PostModal";

interface AllImagesProps {
  selectedTag: string | null;
}

const AllImages: React.FC<AllImagesProps> = ({ selectedTag }) => {
  const { isMobileDevice } = useMediaQueryHook();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [lastVisibleDoc, setLastVisibleDoc] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined);

  const navigate = useNavigate();

  // Define breakpoints for different column counts
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4 });

  const [isFetching, setIsFetching] = useState(false);
  const fetchPosts = useCallback(async () => {
    if (!isFetching) {
      setIsFetching(true);
      try {
        const { docs, lastVisible } = await getPosts(lastVisibleDoc);
        setLastVisibleDoc(lastVisible);
        setAllPosts((oldPosts) => [...oldPosts, ...docs]);
      } catch (er) {
      } finally {
        setIsFetching(false);
      }
    }
  }, [lastVisibleDoc]);

  const fetchOnce = useRef(false);
  useEffect(() => {
    if (!fetchOnce.current) {
      fetchOnce.current = true;
      fetchPosts();
    }
  }, []);

  const handleImageClick = (post: Post) => {
    incrementStats(post.id, StatType.Views);
    if (isMobileDevice) {
      return navigate(`/post/${post.id}`);
    }
    setSelectedPost(post);
    onOpen();
  };

  // Filter posts based on the selectedTag
  const filteredPosts = selectedTag
    ? allPosts.filter((post) => post.tags && post.tags.includes(selectedTag))
    : allPosts;

  return (
    <>
      <Box p={{ base: 2, md: 4, lg: 6 }} maxW="100vw" overflowX="hidden">
        <ImageList variant="masonry" cols={columns} gap={10}>
          {allPosts.length === 0 ? (
            [...Array(10).keys()].map((_) => <MasonryItemSkeleton key={_} />)
          ) : (
            <>
              <InfiniteScroll
                initialLoad={false}
                loadMore={fetchPosts}
                hasMore={lastVisibleDoc !== undefined}
                loader={
                  lastVisibleDoc ? (
                    <div className="loader" key="loader">
                      Loading ...
                    </div>
                  ) : undefined
                }
              >
                {filteredPosts.map((post: Post) => (
                  <ImageListItem
                    key={post.id}
                    onClick={() => handleImageClick(post)}
                  >
                    <img
                      src={`${post.image}?w=500&fit=crop&auto=format`}
                      srcSet={`${post.image}?w=500&fit=crop&auto=format&dpr=2 2x`}
                      alt={post.text}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
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
              </InfiniteScroll>
            </>
          )}
        </ImageList>
      </Box>
      {selectedPost ? (
        <PostModal isOpen={isOpen} onClose={onClose} post={selectedPost} />
      ) : null}
    </>
  );
};

export default memo(AllImages);
