import {
  Box,
  HStack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import { AppStateContext } from "../../AppStateContext";

interface PostStatsProps {
  message: string | any;
  postDate: string | any;
  viewCount: number;
  downloadCount: number;
  id?: string;
  userId?: string;
  commentsCount?: number;
  likesCount?: number;
}

const PostStats = ({
  message,
  postDate,
  viewCount,
  downloadCount,
  id,
  userId,
  commentsCount,
  likesCount,
}: PostStatsProps) => {
  // Convert postDate to a Date object
  const date = new Date(postDate);

  const [{ posts }, , {}]: any = useContext(AppStateContext);

  const totalLikes = new Set(posts.id?.likes || []).size;

  // Format the date as "day month year"
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);

  return (
    <>
      <Box flex="1">
        <HStack>
          <VStack align="start">
            {/* Show the title of the post */}
            <Text>{message}</Text>
            <Text as="sub" color="gray.500">
              Posted on: {formattedDate}
            </Text>
          </VStack>
        </HStack>
      </Box>
      <Box flex="1" mt={4}>
        <StatGroup>
          <Stat size={"sm"} mr={10}>
            <StatLabel>Views</StatLabel>
            <StatNumber>{viewCount}</StatNumber>
          </Stat>
          <Stat size={"sm"} mr={10}>
            <StatLabel>Downloads</StatLabel>
            <StatNumber>{downloadCount}</StatNumber>
          </Stat>
          <Stat size={"sm"} mr={10}>
            <StatLabel>Likes</StatLabel>
            <StatNumber>{likesCount || "0"}</StatNumber>
          </Stat>
          <Stat size={"sm"} mr={10}>
            <StatLabel>Comment</StatLabel>
            <StatNumber>{commentsCount}</StatNumber>
          </Stat>
        </StatGroup>
      </Box>
    </>
  );
};

export default PostStats;
