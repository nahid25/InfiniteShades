import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Grid,
  Image,
  Center,
  Flex,
  Stack,
  CardBody,
  CardFooter,
  Button,
  Card,
  HStack,
  Highlight,
} from "@chakra-ui/react";
import CreatePost from "../CreatePost/CreatePost";
import { Link } from "react-router-dom";
import { CustomButton, PrimaryButton, SocialLink } from "../shared/Button";
import Layout from "../shared/Layout";

import FeatureTimeline from "./FeatureTimeline";
import TechStack from "./TechStack";

const AboutPage = () => {
  return (
    <Layout
      hideSidebar={true}
      createCustomButton={[
        // Custom buttons in the header
        <Link key="1" to="/about">
          <PrimaryButton buttonText={"About"} _disabled={true} />
        </Link>,
        <Link key="2" to="/">
          <PrimaryButton buttonText={"Home"} />
        </Link>,
        <CustomButton key="3" buttonText={"Send a feedback"} />,
      ]}
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={6} position="relative">
        {/* Left side image */}
        <Box w="100%">
          <Image
            src="\src\assets\left side.png"
            alt="Left Side Image"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
        {/* Right side image */}
        <Box w="100%">
          <Image
            src="\src\assets\right side.png"
            alt="Right side image"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
        {/* Centered content */}
        <Flex
          position="absolute"
          width={["100%", "80%", "70%", "70%"]}
          top={["50%", "20%", "30%", "30%"]}
          left={["50%", "56.5%", "56.5%", "56.5%"]}
          transform={[
            "translate(-50%, -50%)",
            "translate(-50%, -20%)",
            "translate(-50%, -30%)",
            "translate(-50%, -30%)",
          ]}
          zIndex="1"
        >
          <Center>
            <Box
              p={5}
              bg={useColorModeValue(
                "rgba(255, 255, 255, 0.8)",
                "rgba(0, 0, 0, 0.8)"
              )}
              borderRadius="xl"
            >
              <VStack spacing={["2", "4", "6", "10"]}>
                <Heading
                  as="h3"
                  fontFamily="'Poppins', sans-serif"
                  fontWeight="800"
                  size={["sm", "md", "md", "xl"]}
                >
                  Unleash the Power of Visual Narratives
                </Heading>
                <Heading
                  as="h6"
                  fontFamily="'Poppins', sans-serif"
                  fontWeight="400"
                  color="GrayText"
                  size={["sm", "sm", "sm", "sm"]}
                >
                  Join us in exploring the world through extraordinary
                  photographic stories.
                </Heading>
                <HStack spacing={["2", "4", "6", "10"]}>
                  {/* Browse button */}
                  <Link to="/">
                    <Button size={["xs", "sm", "sm", "md"]}>Browse</Button>
                  </Link>
                  {/* Create post button */}
                  <CreatePost />
                </HStack>
              </VStack>
            </Box>
          </Center>
        </Flex>
      </Grid>

      {/* Feature timeline */}
      <Flex width="100%" height="auto">
        <FeatureTimeline />
      </Flex>

      {/* Tech stack */}
      <Flex height="80vh" width="100%" mt={["30vh", "10vh", "10vh"]}>
        <TechStack />
      </Flex>

      {/* Other components */}
      <Flex
        height="80vh"
        width="100%"
        justifyContent="center"
        alignItems="center"
        mt={["5vh", "0vh", "0vh"]}
        mb={["5vh", "0vh", "0vh"]}
      >
        <Card
          direction={{ base: "column", sm: "row" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={["100%", "80%", "70%"]}
          height="auto"
          bgGradient="linear(to-b, #ffffff 2%, #ffffff 99%, #65d5ff 100%)"
          boxShadow="md"
          rounded="md"
          overflow="auto"
        >
          <CardBody>
            <Flex justifyContent="space-between" alignItems="center">
              <Box width="60%">
                <Heading as="h1" size="xl" mb={4}>
                  Welcome to Infinite Shade
                </Heading>
                <Text fontSize="sm">
                  {/* Highlighted text */}
                  <Highlight
                    query={["Nahidul Ekon"]}
                    styles={{
                      px: "2",
                      py: "1",
                      rounded: "full",
                      bg: "cornflowerblue",
                      fontWeight: "800",
                    }}
                  >
                    Greetings! I am Nahidul Ekon, a passionate software engineer
                    and avid photographer. This platform combines technology and
                    art to showcase photographers like you. Join me on this
                    journey, where we explore the beauty around us. Your
                    thoughts, suggestions, and stories are always welcome. Let's
                    enrich our world with visual narratives.
                  </Highlight>
                </Text>
                <HStack m={4} mt={8}>
                  {/* Social links */}
                  <SocialLink />
                </HStack>
              </Box>
              <Box>
                {/* Profile image */}
                <Image
                  borderRadius="full"
                  boxSize="200px"
                  src="src\assets\_MG_6035.jpg"
                  alt="Nahidul Ekon"
                  objectFit="contain"
                  bg={"gray.800"}
                />
              </Box>
            </Flex>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </Flex>

      {/* Feedback section */}
      <VStack spacing={4} align="stretch" height={"110vh"} width="100%">
        <Image
          src="https://images.unsplash.com/photo-1515060939377-d73d9c162a66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1152&q=80"
          objectFit="cover"
          top="0"
          bottom="0"
          right="0"
          left="0"
          opacity="0.8"
          height="30vh"
        />
        <Box h="80vh">
          <Flex direction="column" alignItems="center" height="100%">
            <Stack>{/* Feedback Form Component */}</Stack>
          </Flex>
        </Box>
      </VStack>
    </Layout>
  );
};

export default AboutPage;
