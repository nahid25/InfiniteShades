import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../../models/Post';
import { getPostById } from '../../services/db';
import Layout from '../../components/Layout';
import MasonryMobileItemSkeleton from './components/MasonryMobileItemSkeleton';
import { Box, Flex } from '@chakra-ui/react';
import PostImage from './components/PostImage';
import PostMobileHeader from './components/mobile/PostMobileHeader';
import PostMobileStats from './components/mobile/PostMobileStats';
import PostMobileGuide from './components/mobile/PostMobileGuide';
import PostComment from './components/PostComment';

const ViewPostScreen = memo(() => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (postId) {
            getPostById(postId).then(setPost);
        }
    }, [postId]);

    if (!post) {
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
              <PostMobileHeader post={post} />
              <PostImage
                image={post.image}
                imageWidth={post.dimension.width ?? 0}
                imageHeight={post.dimension.height ?? 0}
              />
              <PostMobileStats
                message={post.text ?? ""}
                postDate={post.createdAt}
                postId={post.id}
              />
               <PostMobileGuide />
              <PostComment postId={post.id}/>
            </Box>
          </Flex>
        </Layout>
      );
})

export default ViewPostScreen;