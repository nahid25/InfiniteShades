import { Button, Divider, Link } from "@chakra-ui/react";
import {
  AiFillInstagram,
  AiFillMediumSquare,
  AiFillLinkedin,
} from "react-icons/ai";
import {memo} from 'react';

interface CustomButtonProps {
  buttonText: string;
  onClick?: () => void;
}

interface TagsButtonProp {
  buttonText: string;
  onClick?: () => void;
  isActive?: boolean;
}


export const PrimaryButton = memo(({ buttonText, _disabled, size }: any) => {
  return (
    <Button
      m="10px ! important"
      variant="link"
      colorScheme="blackAlpha"
      fontSize="sm"
      _hover={{ color: "#000000" }}
      isDisabled={_disabled}
      _disabled={{ color: "cornflowerblue" }}
    >
      {buttonText}
    </Button>
  );
});

// TagsButton component
export const TagsButton = ({ buttonText, onClick, isActive }: TagsButtonProp) => {
  return (
    <Button
      fontWeight="300"
      bg={isActive ? "#9ACDFF" : "transparent"} // Set background color when active
      color={isActive ? "white" : "#707070"} // Set text color when active
      borderColor={"#9ACDFF"}
      variant={isActive ? "solid" : "outline"}
      _hover={{ bg: "#6495ED", color: "white" }} // Set hover state colors
      size="sm"
      fontSize="12px"
      m="10px !important"
      fontFamily="Poppins, sans-serif"
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};


export const CustomButton = memo(({ buttonText, onClick }: CustomButtonProps) => {
  return (
    <Button
      fontWeight="400"
      color={"#707070"}
      borderColor={"#9ACDFF"}
      variant={"outline"}
      _hover={{ color: "#000000", borderColor: "#6495ED" }}
      size="md"
      fontSize="sm"
      m="10px !important"
      fontFamily="Poppins, sans-serif"
      onClick={onClick} // use the onClick prop here
    >
      {buttonText}
    </Button>
  );
});

export const SocialLink = memo(() => {
  return (
    <>
      <Divider />
      <Link href="https://www.instagram.com/_nahid.ekon/" target="_blank">
        <AiFillInstagram size={20} />
      </Link>
      <Link href="https://medium.com/@nahidekon314" target="_blank">
        <AiFillMediumSquare size={20} />
      </Link>
      <Link href="https://www.linkedin.com/in/nahidul-ekon/" target="_blank">
        <AiFillLinkedin size={20} />
      </Link>
      <Divider />
    </>
  );
});
