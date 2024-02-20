import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { SiTypescript, SiFirebase, SiReact } from "react-icons/si";
import { AiFillApi } from "react-icons/ai";
import {memo} from 'react';

const TechStack = () => {
  return (
    <>
      {/* Tech Stack Container */}
      <VStack
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={["100%", "80%", "70%"]}
        height="auto" // Adjust the height
        position="relative"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bgGradient="linear(to-b, #ffffff 2%, #ffffff 99%, #65d5ff 100%)"
        boxShadow="md"
        rounded="md"
        overflow="auto" // Add overflow property
      >
        {/* Heading */}
        <Heading fontFamily="Poppins, sans-serif" fontWeight="800">
          TECH STACK
        </Heading>

        {/* Tech Stack Cards */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={3}
          paddingLeft={3}
          paddingRight={3}
          width="100%"
        >
          {/* Frontend Card */}
          <Card>
            <CardHeader>
              <Heading size="sm">Frontend</Heading>
              <HStack>
                <SiReact />
                <SiTypescript />
              </HStack>
            </CardHeader>
            <CardBody>
              <Text>
                React with TypeScript, Chakra UI and Material-UI for design
                components.
              </Text>
            </CardBody>
          </Card>

          {/* Backend Card */}
          <Card>
            <CardHeader>
              <Heading size="sm">Backend</Heading>
              <HStack>
                <SiFirebase />
              </HStack>
            </CardHeader>
            <CardBody>
              <Text>
                Firebase services including Firebase Authentication, Firebase
                Realtime Database, and Firebase Storage.
              </Text>
            </CardBody>
          </Card>

          {/* State Management API Card */}
          <Card>
            <CardHeader>
              <Heading size="sm">State Management API</Heading>
              <HStack>
                <AiFillApi />
              </HStack>
            </CardHeader>
            <CardBody>
              <Text>
                GlobalContext (Context API) for managing global state. Image
                compression (Imgix API) for customise image compression.
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default memo(TechStack);
