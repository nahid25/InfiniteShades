import { Box, Button, HStack, Heading, Input } from "@chakra-ui/react";

const PostComment = () => {
  return (
    <>
      <Heading as="h3" size="lg" p="25px">
        Leave a comment
      </Heading>
      <HStack>
        <Input
          focusBorderColor="blue.400"
          placeholder="Write a comment."
        ></Input>
        <Button variant={"outline"}>Submit</Button>
      </HStack>
    </>
  );
};

export default PostComment;
