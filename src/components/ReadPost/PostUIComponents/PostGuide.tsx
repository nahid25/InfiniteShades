import React from "react";
import { Heading, HStack, Text, OrderedList, ListItem } from "@chakra-ui/react";
import { BsCamera } from "react-icons/bs";

const PostGuide = () => {
  return (
    <>
      <Heading as={"h3"} size="lg" p="25px">
        <HStack>
          <BsCamera />
          <Text>How to Guide</Text>
        </HStack>
      </Heading>
      <HStack ml={5}>
        <OrderedList style={{ listStyle: "none" }}>
          <ListItem>Camera Name</ListItem>
          <ListItem>F-stop</ListItem>
          <ListItem>ISO</ListItem>
          <ListItem>Exposure time</ListItem>
        </OrderedList>
      </HStack>
    </>
  );
};

export default PostGuide;
