import { Button, Heading, Text } from "@chakra-ui/react";
import { FormControl, Input } from "@chakra-ui/react";

interface title {
  title: string;
}

export const WelcomeTitle = ({ title }: title) => {
  const name = localStorage.getItem("PostName") || "Guest";

  return (
    <Heading as="h1" size="lg" p="25px" textAlign="center">
      Welcome {name}👋 {title}
    </Heading>
  );
};

const hasNameAndId = () => {
  const getID = localStorage.getItem("PostID");
  const getName = localStorage.getItem("PostName");
  return !!(getID && getName);
};

export const FormNameInputUI = ({ register, error }: any) => (
  <>
    {!hasNameAndId() && (
      <FormControl pt="20px" pb="20px">
        <Input
          {...register("name")}
          fontFamily="'Poppins', sans-serif"
          variant="flushed"
          placeholder="Your name"
          width="100%"
        />
        {error && (
          <Text color="red" size="sm">
            {error.message}
          </Text>
        )}
      </FormControl>
    )}
  </>
);

export const FormEmailInputUI = ({ register, error }: any) => (
  <FormControl pt="20px" pb="20px">
    <Input
      {...register("email")}
      fontFamily="'Poppins', sans-serif"
      variant="flushed"
      placeholder="Email Adress"
      width="100%"
    />
    {error && <Text color="red">{error.message}</Text>}
  </FormControl>
);

export const FormMessageInputUI = ({
  register,
  error,
  placeholderText,
}: any) => (
  <FormControl pt="20px" pb="20px">
    <Input
      {...register("message")}
      as="textarea"
      variant="flushed"
      fontFamily="'Poppins', sans-serif"
      placeholder={placeholderText}
      height="xs"
      width="100%"
      resize="none"
    />
    {error && <Text color="red">{error.message}</Text>}
  </FormControl>
);

export const FormSubmitButtonUI = ({ onSubmit }: any) => (
  <Button colorScheme="blue" onClick={onSubmit}>
    Get In Touch
  </Button>
);
