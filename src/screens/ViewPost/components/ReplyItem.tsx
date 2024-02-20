import { memo, useMemo } from "react";
import { Comment } from "../../../models/Post";
import { HStack, Avatar, Button, Text, VStack } from "@chakra-ui/react";
import { getFormattedDate } from "../../../utils/utils";

export const ReplyItem = memo(({ replies, handleReply, commentId }: { replies: Comment[]; handleReply: (id: string) => void; commentId: string }) => {

    const sortedReplies = useMemo(() => {
        return replies.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
    }, [replies])

    return sortedReplies.map(reply => {
        return <HStack
            key={reply.id}
            spacing={4}
            align="center"
            margin="20px 20px 20px 20px !important"
        >
            <Avatar
                size="sm"
                name={reply.userName}
            />
            <VStack alignItems={'flex-start'}>
                <Text fontSize="sm">{reply.text}</Text>
                <Text as="sub" color="gray.500">
                    {getFormattedDate(reply.createdAt)}
                </Text>
            </VStack>
            <Button
                m="10px ! important"
                variant="link"
                colorScheme="blackAlpha"
                fontSize="xs"
                _hover={{ color: "#000000" }}
                _active={{ color: "cornflowerblue" }}
                onClick={() => handleReply(commentId)}
            >
                Reply
            </Button>
        </HStack>
    })
})