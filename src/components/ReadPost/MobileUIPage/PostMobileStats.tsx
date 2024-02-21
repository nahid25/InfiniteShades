import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Box,
  HStack,
  VStack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

interface PostStatsProps {
  message: string | any;
  postDate: string | any;
}

const PostMobileStats = ({ message, postDate }: PostStatsProps) => {
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
              <StatNumber>500</StatNumber>
            </Stat>
          </Box>
          <Box>
            <Stat size="xs">
              <StatLabel>Downloads</StatLabel>
              <StatNumber>45</StatNumber>
            </Stat>
          </Box>
          <Box>
            <Stat size="xs">
              <StatLabel>Likes</StatLabel>
              <StatNumber>30</StatNumber>
            </Stat>
          </Box>
          <Box>
            <Stat size="xs">
              <StatLabel>Comment</StatLabel>
              <StatNumber>10</StatNumber>
            </Stat>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default PostMobileStats;
