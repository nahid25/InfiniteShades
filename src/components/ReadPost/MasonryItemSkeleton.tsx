import { Skeleton, ThemeProvider, createTheme } from "@mui/material";
import { Avatar, Box, Button, Flex } from "@chakra-ui/react";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";

const theme = createTheme();

const MasonryItemSkeleton = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box width="100%" position="relative">
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{ paddingTop: "75%" }}
          animation="wave"
        />

        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.3)"
          opacity="0"
          _hover={{ opacity: "1" }}
          transition="opacity 0.3s"
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Flex p="4">
            <Button leftIcon={<AiOutlineLike />} variant="solid" />
            <Button leftIcon={<AiOutlineComment />} ml="2" variant="solid" />
            <Button leftIcon={<AiOutlineShareAlt />} ml="2" variant="solid" />
          </Flex>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MasonryItemSkeleton;
