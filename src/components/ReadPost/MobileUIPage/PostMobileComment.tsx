import { Button, HStack, Heading, Input } from "@chakra-ui/react";

const PostMobileComment = () => {
  return (
    <>
      <Heading as="h3" size="lg" m="25px 0 25px 0">
        Leave a comment
      </Heading>
      <HStack mb="25px">
        <Input
          focusBorderColor="blue.400"
          placeholder="Write a comment."
        ></Input>
        <Button variant={"outline"}>Submit</Button>
      </HStack>
    </>
  );
};

export default PostMobileComment;
