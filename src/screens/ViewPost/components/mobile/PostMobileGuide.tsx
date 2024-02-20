import { Heading, HStack, Text, OrderedList, ListItem } from "@chakra-ui/react";
import { memo } from "react";
import { BsCamera } from "react-icons/bs";

const PostMobileGuide = () => {
  return (
    <>
      <Heading as={"h3"} size="lg" m="25px 0 25px 0">
        <HStack>
          <BsCamera />
          <Text>How to Guide</Text>
        </HStack>
      </Heading>
      <HStack>
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

export default memo(PostMobileGuide);
