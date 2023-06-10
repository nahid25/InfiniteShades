import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  VStack,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAppState } from "../../AppStateContext";
import { v4 as uuidv4 } from "uuid";

const PostComment = ({ postId, userId }: any) => {
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [state, dispatch, { createData }] = useAppState();
  let currentUserId = localStorage.getItem("UserID") || "";

  const handleSubmit = () => {
    if (comment.trim() !== "") {
      const commentData = {
        commentId: uuidv4(),
        postId: postId,
        currentUserId: currentUserId,
        userId: userId,
        text: comment,
        datePosted: new Date().toISOString(),
      };

      createData("comments", postId, commentData.commentId, commentData);
      setComment("");
      setReplyTo("");
    }
  };

  const postComments = state.comments[`${userId}-${postId}`] || {};

  const relatedComments = Object.values(postComments);

  const handleReply = (comment: any) => {
    setReplyTo(comment.currentUserId);
    setComment(`@${comment.currentUserId} `);
  };

  const formatDate = (dateString: any) => {
    const dateObj = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return `commented on: ${dateObj.toLocaleString("en-US", options)}`;
  };

  return (
    <>
      <Box pb="30px !important">
        <Heading as="h3" size="lg" p="25px">
          Leave a comment
        </Heading>
        <HStack width="100%" justify="space-around">
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            focusBorderColor="blue.400"
            placeholder="Write a comment."
          ></Input>
          <Button onClick={handleSubmit} variant={"outline"}>
            Submit
          </Button>
        </HStack>
        <VStack align="start" spacing={4} mt={4}>
          {relatedComments.map((comment: any) => (
            <Box
              key={comment.commentId}
              borderWidth={1}
              borderRadius="lg"
              p={4}
              width="100%"
            >
              <VStack align="start" spacing={2}>
                <HStack spacing={4} align="center">
                  <Avatar size="sm" name={comment.currentUserId} />
                  <Text fontSize="sm">{comment.text}</Text>
                  <Button
                    m="10px ! important"
                    variant="link"
                    colorScheme="blackAlpha"
                    fontSize="xs"
                    _hover={{ color: "#000000" }}
                    _active={{ color: "cornflowerblue" }}
                    onClick={() => handleReply(comment)}
                  >
                    Reply
                  </Button>
                </HStack>
                <Text as="sub" color="gray.500">
                  {formatDate(comment.datePosted)}
                </Text>
              </VStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </>
  );
};

export default PostComment;
