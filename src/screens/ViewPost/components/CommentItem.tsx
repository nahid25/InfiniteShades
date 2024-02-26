import { memo } from 'react';
import { Comment } from '../../../models/Post';
import {
    Box,
    Button,
    HStack,
    VStack,
    Text,
    Avatar,
} from "@chakra-ui/react";
import { getFormattedDate } from '../../../utils/utils';
import { ReplyItem } from './ReplyItem';

export const CommentItem = memo(({ comment, handleReply }: { comment: Comment; handleReply: (id: string) => void }) => {
    const replies = comment.replies || {};
    const allReplies: Comment[] = [];
    Object.keys(replies).map(replyId => {
        allReplies.push(replies[replyId])
    })
    return <Box
        key={comment.id}
        borderWidth={1}
        borderRadius="lg"
        p={4}
        width="100%"
    >
        <VStack align="start" spacing={2}>
            <HStack spacing={4} align="center">
                <Avatar
                    size="sm"
                    name={comment.userName}
                />
                <Text fontSize="sm">{comment.text}</Text>
                <Button
                    m="10px ! important"
                    variant="link"
                    colorScheme="blackAlpha"
                    fontSize="xs"
                    _hover={{ color: "#000000" }}
                    _active={{ color: "cornflowerblue" }}
                    onClick={() => handleReply(comment.id)}
                >
                    Reply
                </Button>
            </HStack>
            <Text
                as="sub"
                color="gray.500"
                marginBottom="20px !important"
                marginTop="20px !important"
            >
                {`commented on ${getFormattedDate(comment.createdAt)}`}
            </Text>
            <ReplyItem replies={allReplies} handleReply={handleReply} commentId={comment.id} />

        </VStack>
    </Box>
})