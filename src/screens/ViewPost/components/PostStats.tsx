import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Box,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { getFormattedDate } from "../../../utils/utils";
import { useStats } from "../../../services/db";

interface PostStatsProps {
  message?: string;
  postDate: number;
  postId: string;
}

const PostStats = ({
  message,
  postDate,
  postId,
}: PostStatsProps) => {
  const formattedDate = getFormattedDate(postDate);
  const {stats, getData} = useStats(postId);
  useEffect(() => {
    getData();
  }, [postId]);
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
            <StatNumber>{stats?.Views || 0}</StatNumber>
          </Stat>
          <Stat size={"sm"} mr={10}>
            <StatLabel>Downloads</StatLabel>
            <StatNumber>{stats?.Download || 0}</StatNumber>
          </Stat>
          <Stat size={"sm"} mr={10}>
            <StatLabel>Likes</StatLabel>
            <StatNumber>{stats?.Likes || 0}</StatNumber>
          </Stat>
          <Stat size={"sm"} mr={10}>
            <StatLabel>Comment</StatLabel>
            <StatNumber>{stats?.Comment || 0}</StatNumber>
          </Stat>
        </StatGroup>
      </Box>
    </>
  );
};

export default memo(PostStats);
