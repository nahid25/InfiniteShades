import { useContext, memo, useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
  Box,
} from "@chakra-ui/react";
import { SiPostcss } from "react-icons/si";
import { Link } from "react-router-dom";
import {LocalStorageContext} from "../utils/LocalStorageContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface NavBarProps {
  customButton?: JSX.Element[];
}

const NavBar = memo(({ customButton }: NavBarProps) => {
  const { name }: any = useContext(LocalStorageContext) || "";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setIsLoggedIn(true);
      } else {
        // No user is signed in.
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <HStack
      p={{ base: 4, sm: 6, md: 8, lg: 10 }} 
      maxWidth="100vw" 
      width="full" 
      spacing={4} 
      overflowX="hidden" 
      fontFamily="Poppins, sans-serif"
    >
  <SiPostcss size={40} />
  <Box display={{ base: "none", md: "flex" }} alignItems="center">
    <Text fontSize={{ base: "xs", md: "sm", lg: "md" }} >Infinite Shades</Text>
  </Box>
      <Spacer />
      {customButton}
      <Popover>
        <PopoverTrigger>
          <Avatar
            as={Button}
            name={name}
            src=""
            color="white"
            size="md"
            _hover={{ color: "#000000", borderColor: "#6495ED" }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            Welcome {name} <Badge>unactivated</Badge>
          </PopoverHeader>
          <PopoverBody>
            User Name: {name} <br /> Name: {name} <br />
              
              {isLoggedIn ? (
                <Link to="/UserProfile">
                  UserProfile
                  </Link>
              ) : (
                <Link to="/Login">
                    <Button
                    fontWeight="400"
                    color="#707070"
                    borderColor="green"
                    variant="outline"
                    _hover={{ color: "#000000", borderColor: "green" }}
                    size="md"
                    fontSize="sm"
                  >
                    Activate
                  
                  </Button>
              </Link>
              )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  );
});

export default NavBar;
