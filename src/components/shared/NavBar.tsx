import { Avatar, HStack, Spacer, Text } from "@chakra-ui/react";
import { SiPostcss } from "react-icons/si";

// Define a type for the props
interface NavBarProps {
  customButton?: JSX.Element[]; // Make customButton optional
}

// Add customButton to props
const NavBar = ({ customButton }: NavBarProps) => {
  return (
    <HStack p={8} fontFamily="Poppins, sans-serif">
      <SiPostcss size={40}></SiPostcss>
      <Text>Infinite Shades</Text>
      <Spacer />
      {/* About Button */}
      {customButton} {/* Render customButton if it exists */}
      <Avatar
        m="10px ! important"
        name="Nahid Ekon"
        src=""
        bgColor="cornflowerblue"
        color="white"
        size="md"
      />
    </HStack>
  );
};

export default NavBar;
