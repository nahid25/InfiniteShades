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

interface PostStatsProps {
  message: string | any;
  postDate: string | any;
  viewCount: number;
  downloadCount: number;
  commentsCount: number;
}

const PostStats = ({
  message,
  postDate,
  viewCount,
  downloadCount,
  commentsCount,
}: PostStatsProps) => {
  // Convert postDate to a Date object
  const date = new Date(postDate);

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
            <StatNumber>30</StatNumber>
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
