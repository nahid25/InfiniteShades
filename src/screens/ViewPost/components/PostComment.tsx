import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useState, memo, useEffect, useCallback } from "react";
import { getNameAndId } from "../../../utils/helper";
import { postComment, useCommentsHook } from '../../../services/db';
import { Comment } from "../../../models/Post";
import { CommentItem } from "./CommentItem";
import { useMediaQueryHook } from "../../../utils/MediaQuery";

interface PostCommentProps {
  postId: string;
}

const PostComment = ({ postId }: PostCommentProps) => {
  const [commentInput, setCommentInput] = useState('');
  const [replyId, setReplyId] = useState<string | undefined>(undefined);

  const {isMobileDevice} = useMediaQueryHook();

  const { id: currentUserId } = getNameAndId()

  const {comments, getData} = useCommentsHook(postId);

  useEffect(() => {
    getData()
  }, [postId])

  const handleSubmit = useCallback(async () => {
    if (commentInput) {
      await postComment(postId, commentInput, replyId);
      setCommentInput('');
      setReplyId(undefined);
    }
  }, [commentInput, postId]);

  const handleReply = useCallback((commentId: string) => {
    setReplyId(commentId);
    setCommentInput(`@${currentUserId} `);
  }, [currentUserId])

  return (
    <>
      <Box pb="30px !important">
        <Heading as="h3" size="lg" p={isMobileDevice ? "25px 0 25px 0" : "25px"}>
          Leave a comment
        </Heading>
        <HStack width="100%" justify="space-around">
          <Input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            focusBorderColor="blue.400"
            placeholder="Write a comment."
          ></Input>
          <Button onClick={handleSubmit} variant={"outline"}>
            Submit
          </Button>
        </HStack>
        <VStack align="start" spacing={4} mt={4}>
          <Text mt={2}>
            {comments.length}{" "}
            {comments.length === 1 ? "Comment" : "Comments"}
          </Text>
          {comments.map((comment: Comment) =>
            <CommentItem key={comment.id} comment={comment} handleReply={handleReply} />
          )}
        </VStack>
      </Box>
    </>
  );
};

export default memo(PostComment);
