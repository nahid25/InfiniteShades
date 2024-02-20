import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  HStack,
  VStack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { memo, useEffect } from 'react';
import { getFormattedDate } from "../../../../utils/utils";
import { useStats } from "../../../../services/db";

interface PostStatsProps {
  message?: string;
  postDate: number;
  postId: string;
}

const PostMobileStats = ({message, postDate, postId }: PostStatsProps) => {

  const formattedDate = getFormattedDate(postDate);
  const { stats, getData } = useStats(postId);
  useEffect(() => {
    getData();
  }, [postId]);

  return (
    <>
      <Box flex="1">
        <HStack mt={10}>
          <VStack align="start">
            {/* Show the title of the post */}
            <Text fontSize="lg">{message}</Text>
            <Text fontSize="sm" color="gray.500">
              Posted on: {formattedDate}
            </Text>
          </VStack>
        </HStack>
      </Box>
      <Box flex="1" mt={10}>
        <SimpleGrid minChildWidth="120px" spacing="10px" color="gray.600">
          <Box>
            <Stat size="xs">
              <StatLabel>Views</StatLabel>
              <StatNumber>{stats?.Views || 0}</StatNumber>
            </Stat>
          </Box>
          <Box>
            <Stat size="xs">
              <StatLabel>Downloads</StatLabel>
              <StatNumber>{stats?.Download || 0}</StatNumber>
            </Stat>
          </Box>
          <Box>
            <Stat size="xs">
              <StatLabel>Likes</StatLabel>
              <StatNumber>{stats?.Likes || 0}</StatNumber>
            </Stat>
          </Box>
          <Box>
            <Stat size="xs">
              <StatLabel>Comment</StatLabel>
              <StatNumber>{stats?.Comment || 0}</StatNumber>
            </Stat>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default memo(PostMobileStats);
