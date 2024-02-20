import { useContext, memo } from "react";
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
} from "@chakra-ui/react";
import { SiPostcss } from "react-icons/si";
import { Link } from "react-router-dom";
import {LocalStorageContext} from "../utils/LocalStorageContext";

interface NavBarProps {
  customButton?: JSX.Element[];
}

const NavBar = memo(({ customButton }: NavBarProps) => {
  const { name }: any = useContext(LocalStorageContext) || "";

  return (
    <HStack p={10} fontFamily="Poppins, sans-serif">
      <SiPostcss size={40} />
      <Text>Infinite Shades</Text>
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
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  );
});

export default NavBar;
