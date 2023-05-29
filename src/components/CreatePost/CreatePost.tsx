import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalOverlay,
  useDisclosure,
  Text,
  Progress,
} from "@chakra-ui/react";
import { CustomButton } from "../shared/Button";
import {
  FormMessageInputUI,
  FormSubmitButtonUI,
  WelcomeTitle,
} from "../shared/FormComponents";
import { FormNameInputUI } from "../shared/FormComponents";
import { useFormValidation } from "../shared/Hooks/useFormHandler";
import { createUser } from "./Hooks/createUser";
import ImageInput from "./ImageInput";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUserName] = useState("");
  const [imageError, setImageError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // add this line to declare the loading state
  const [image, setImage] = useState<File | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const OverlayTwo = () => (
    <ModalOverlay
      bg="blackAlpha.600"
      backdropFilter="auto"
      backdropBlur="10px"
    />
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormValidation(true, true); // Email is optional

  const [overlay, setOverlay] = useState(<OverlayTwo />);

  const handleImageChange = (image: File) => {
    setImage(image);
    setImageError(null);
    const img = new Image();
    const objectUrl = URL.createObjectURL(image);
    img.onload = () => {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  };

  const onSubmit = (data: any) => {
    setUserName(data.name);
  };

  useEffect(() => {
    if (userName) {
      createUser(userName);
    }
  }, [userName]);

  return (
    <>
      <CustomButton
        buttonText={"Create Post"}
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
      />
      <Modal isCentered isOpen={isOpen} size={"4xl"} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>
            {/* Heading */}
            <WelcomeTitle title="share your post" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Image Input */}
            <ImageInput onImageChange={handleImageChange} />
            {imageError && (
              <Text color="red.500" fontSize="md">
                {imageError}
              </Text>
            )}
            {/* Show the progress bar when image is uploading */}
            {isLoading && (
              <Progress value={uploadProgress} color="cornflowerblue" />
            )}

            <FormNameInputUI register={register} error={errors.name} />
            <FormMessageInputUI
              placeholderText="Write your post (Optional)"
              register={register}
              error={errors.message}
            />
          </ModalBody>
          <ModalFooter>
            <FormSubmitButtonUI onSubmit={handleSubmit(onSubmit)} />
            <Button m={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
