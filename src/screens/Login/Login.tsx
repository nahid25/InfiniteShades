import { Link as RouteLink } from "react-router-dom";
import {
    AbsoluteCenter,
    Avatar,
    AvatarBadge,
    Box,
    Divider,
    Flex,
    Grid,
    GridItem,
    HStack,
    Heading,
    Input,
    Text,
    useToast
} from "@chakra-ui/react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";
import Layout from "../../components/Layout";
import { CustomButton, PrimaryButton } from "../../components/Button";
import { getNameAndId } from "../../utils/helper";
import { sendLoginLinkToEmail } from '../../services/db';
import { memo, useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const { name } = getNameAndId();
    const toast = useToast();

    const handleSendSignInLink = async () => {
        if (email) {
            try {
                await sendLoginLinkToEmail(email);
                toast({
                    title: 'Check your email',
                    description: "We've sent you a link to sign in. Please check your email.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            } catch (error) {
                toast({
                    title: 'Error',
                    description: "There was an error sending the sign-in link. Please try again.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    };
    return (
        <Layout
            hideSidebar={true}
            createCustomButton={[
                <RouteLink key="1" to="/about">
                    <PrimaryButton buttonText={"About"} _disabled={true} />
                </RouteLink>,
                <RouteLink key="2" to="/">
                    <PrimaryButton buttonText={"Home"} />
                </RouteLink>,
            ]}
        >
            <Flex justifyContent="center" bg="white">
                <Grid rounded={5} m={10} p={10}>
                    <GridItem>
                        <HStack justifyContent="center">
                            <Avatar name={name}>
                                <AvatarBadge bg="white">
                                    <BsExclamationCircleFill color="tomato" />
                                </AvatarBadge>
                            </Avatar>
                        </HStack>
                    </GridItem>
                    <GridItem>
                        <Heading
                            as="h1"
                            size="lg"
                            p="25px"
                            textAlign="center"
                            fontFamily="Poppins, sans-serif"
                        >
                            Activate to your account
                        </Heading>
                        <Heading
                            as="h1"
                            fontFamily="'Poppins', sans-serif"
                            fontWeight="400"
                            color="GrayText"
                            size={["sm", "sm", "sm", "sm"]}
                        >
                            Join us in exploring the world through extraordinary photographic
                            stories.
                        </Heading>
                    </GridItem>
                    <GridItem mt={10}>
                        <Input
                            variant="flushed"
                            placeholder="Enter your email"
                            fontFamily="Poppins, sans-serif"
                            borderColor="blackAlpha.600"
                            textAlign="center"
                            size="md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                         <Flex justifyContent="center" mt={5}>
                            <CustomButton buttonText="Continue with Email" onClick={handleSendSignInLink} />
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Box position="relative" mt={10}>
                            <Divider borderColor="blackAlpha.600" />
                            <AbsoluteCenter bg="white" px="4">
                                <Text fontFamily="Poppins, sans-serif">OR</Text>
                            </AbsoluteCenter>
                        </Box>
                        <Heading
                            as="h1"
                            fontFamily="'Poppins', sans-serif"
                            fontWeight="400"
                            color="GrayText"
                            size={["sm", "sm", "sm", "sm"]}
                            textAlign="center"
                            mt={5}
                        >
                            Continue With
                        </Heading>
                    </GridItem>
                    <GridItem>
                        <Flex mt={10} justifyContent="center">
                            <HStack spacing={5}>
                                <FaFacebookMessenger color="#0078FF" size="30" />
                                <FcGoogle size="30" />
                                <AiFillGithub size="30" />
                                <AiFillTwitterCircle color="#1DA1F2" size="35" />
                            </HStack>
                        </Flex>
                    </GridItem>
                </Grid>
            </Flex>
        </Layout>
    );
};

export default memo(Login);