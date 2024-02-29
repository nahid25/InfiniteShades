import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Avatar,
  Divider,
  Center,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Layout from "../../components/Layout";
import { useState } from "react";

const UserProfile = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [setShowTags] = useState(false);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <Layout showTags={setShowTags}>
      <Box display="flex" justifyContent="center" width="100%">
        <Box display="flex" justifyContent="center" width="50%">
          {" "}
          {/* Wrapper to center the Grid */}
          <Grid
            templateRows={{ base: "repeat(4, 1fr)", md: "repeat(2, 1fr)" }}
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={1}
            p={1}
            width="auto"
            maxWidth="100%"
            alignItems="center"
          >
            {/* First Row Columns */}
            <GridItem colSpan={{ base: 1, md: 1 }}>
              <Avatar
                size="2xl"
                src={user?.photoURL || ""}
                name={user?.displayName || "NE"}
                bg={"cornflowerblue"}
                mr={6}
              />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 1 }} width={"300px !important"}>
              <Heading size="md">
                {user?.displayName || "@unknown name"}
              </Heading>
              <Text>Username: {user?.email}</Text>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 1 }}>
              <HStack>
                <Box w="auto" h="auto">
                  <Link to="/User/Settings">
                    <Button size={"sm"}>Edit profile</Button>
                  </Link>
                </Box>
                <Box w="auto" h="auto">
                  <Button
                    onClick={handleLogout}
                    size={"sm"}
                    colorScheme={"blue"}
                  >
                    Logout
                  </Button>
                </Box>
              </HStack>
            </GridItem>

            {/* Second Row */}
            <GridItem colSpan={{ base: 1, md: 3 }}>
              <Center m={"0 !important"} p={"0! important"}>
                <Text m={"0 !important"} p={"0! important"}>
                  Description: Download free, beautiful high-quality photos
                  curated by{" "}
                  {user?.displayName ? user.displayName : "@unknown name"}.
                </Text>
              </Center>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Center height="50px">
        <Divider opacity={1} borderColor={"gray.300"} />
      </Center>
      <Center>
        <Text color={"gray.500"}>No photos yet. </Text>
      </Center>
    </Layout>
  );
};

export default UserProfile;
