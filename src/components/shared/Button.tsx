import { Button, Divider, Link } from "@chakra-ui/react";
import {
  AiFillInstagram,
  AiFillMediumSquare,
  AiFillLinkedin,
} from "react-icons/ai";

interface CustomButtonProps {
  buttonText: string;
  onClick?: () => void; // or (event: React.MouseEvent<HTMLButtonElement>) => void; if you need access to the event
}

interface tagsButtonProp {
  buttonText: string;
  onClick?: () => void; // or (event: React.MouseEvent<HTMLButtonElement>) => void; if you need access to the event
}

export const PrimaryButton = ({ buttonText, _disabled, size }: any) => {
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
};

export const CustomButton = ({ buttonText, onClick }: CustomButtonProps) => {
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
};

export const TagsButton = ({ buttonText, onClick }: tagsButtonProp) => {
  return (
    <Button
      fontWeight="300"
      color={"#707070"}
      borderColor={"#9ACDFF"}
      variant={"outline"}
      _hover={{ color: "#000000", borderColor: "#6495ED" }}
      size="sm"
      fontSize="12px"
      m="10px !important"
      fontFamily="Poppins, sans-serif"
      onClick={onClick} // use the onClick prop here
    >
      {buttonText}
    </Button>
  );
};

export const SocialLink = () => {
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
};
