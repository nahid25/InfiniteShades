import { useState } from "react";
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
  Progress,
  Text,
} from "@chakra-ui/react";
import { CustomButton } from "../shared/Button";
import {
  FormMessageInputUI,
  FormSubmitButtonUI,
  WelcomeTitle,
} from "../shared/FormComponents";
import { FormNameInputUI } from "../shared/FormComponents";
import { useFormValidation } from "../shared/Hooks/useFormHandler";
import { Post, User, uploadImage, useAppState } from "../AppStateContext";
import ImageInput from "./ImageInput";

const CreatePost = () => {
  // Hook from Chakra UI for controlling the modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State for the uploaded image
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // add this line to declare the loading state
  // Add a new state for upload progress
  const [uploadProgress, setUploadProgress] = useState(0);

  // Overlay component for the modal
  const OverlayTwo = () => (
    <ModalOverlay
      bg="blackAlpha.600"
      backdropFilter="auto"
      backdropBlur="10px"
    />
  );

  //Check if Name and Id Exist.
  const hasNameAndId = () => {
    const getID = localStorage.getItem("UserID");
    const getName = localStorage.getItem("UserName");
    return !!(getID && getName);
  };

  // useFormValidation custom hook for form validation
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormValidation(hasNameAndId(), true, true);

  // State for the overlay component
  const [overlay, setOverlay] = useState(<OverlayTwo />);

  // Use createData from context
  const [, , { createData }] = useAppState();

  // A handler for image changes
  const onImageChange = (file: File) => {
    setUploadedImage(file); // Set the uploaded image state here
  };

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    let userId =
      data.name.slice(0, 3) + Math.random().toString(36).substr(2, 3);
    let name = data.name;
    const getId = localStorage.getItem("UserID") || "";
    const getName = localStorage.getItem("UserName") || "";

    // Generate current date
    const currentDate = new Date().toISOString();

    if (hasNameAndId()) {
      // Using Context `createData` to uplodad to Firebase.

      const existingUser: User = {
        id: getId,
        name: getName,
        email: "",
      };
      createData("users", getId, "", existingUser);
    } else {
      // Using Context `createData` to uplodad to Firebase.
      const newUser: User = {
        id: userId,
        name: name,
        email: "",
      };
      localStorage.setItem("UserID", userId);
      localStorage.setItem("UserName", name);
      createData("users", userId, "", newUser);
    }

    let imageName = "";
    let width = 0;
    let height = 0;

    if (uploadedImage) {
      try {
        setIsLoading(true); // Start loading

        // Get image dimension before upload
        const img = new Image();
        img.onload = function (event) {
          const target = event.target as HTMLImageElement;
          width = target.naturalWidth;
          height = target.naturalHeight;
        };
        img.src = URL.createObjectURL(uploadedImage);

        const uploadResult = await uploadImage(
          uploadedImage,
          (progress: number) => {
            console.log("Upload progress:", progress);
            setUploadProgress(progress); // Update the upload progress state
          }
        );
        imageName = uploadResult.name;
        setIsLoading(false); // Stop loading when upload is done
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsLoading(false); // Stop loading when there is an error
      }
    }

    // Create post object
    const post: Post = {
      id: Math.random().toString(36).substr(2, 9),
      dateUpdated: currentDate,
      dimension: {
        height: height, // Use height from image dimension
        width: width, // Use width from image dimension
      },
      userId: getId || userId, // use userId if getId is null
      image: `https://infiniteshades.imgix.net/${imageName}`,
      text: data.message,
      likes: {}, // TODO: Need to write the logic for likes.
      comments: {}, // TODO: Need to write the logic for comments.
    };

    // Using Context `createData` to uplodad to Firebase.
    createData("posts", post.id, post.userId, post);
  };

  // The rendered component
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
            <WelcomeTitle title="share your post" /> {/* Title */}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {/* Upload Image */}
            <ImageInput onImageChange={onImageChange} />
            {imageError && (
              <Text color="red.500" fontSize="md">
                {imageError}
              </Text>
            )}
            {/* Show the progress bar when image is uploading */}
            {isLoading && (
              <Progress value={uploadProgress} color="cornflowerblue" />
            )}
            {/* Image input field */}
            <FormNameInputUI register={register} error={errors.name} />{" "}
            {/* Name input field */}
            <FormMessageInputUI
              placeholderText="Write your post (Optional)"
              register={register}
              error={errors.message}
            />
            {/* Message input field */}
          </ModalBody>
          <ModalFooter>
            <FormSubmitButtonUI
              onSubmit={handleSubmit(onSubmit)}
              content={"Submit"}
            />
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
