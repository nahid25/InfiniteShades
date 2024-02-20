import { useState, memo } from "react";
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
import { getNameAndId, hasNameAndId, setUser } from "../../utils/helper";
import { useFormValidation } from "../../hooks/useFormHandler";
import uuidv4 from "uuidv4";
import { CustomButton } from "../../components/Button";
import { WelcomeTitle } from "../../components/WelcomeTitle";
import { FormMessageInputUI, FormNameInputUI, FormSubmitButtonUI, FormTagsInputUI } from "../../components/FormComponent";
import ImageInput from "../../components/ImageInput";
import { Post } from "../../models/Post";
import { User } from "../../models/User";
import { addPost, addUser, uploadImage } from "../../services/db";
import { getDateInMillis } from "../../utils/utils";

// Create user if doesn't exist and return user
export const updateAndGetUser = async (updatedName: string) => {
  if (hasNameAndId()) {
    const {name, id} = getNameAndId();
    const user: User = {id, name, email: ''};
    return user;
  }
  const userId = updatedName.slice(0, 3) + Math.random().toString(36).substr(2, 3);
  const newUser: User = { id: userId, name: updatedName, email: "" };
  setUser(newUser);
  await addUser(newUser)
  return newUser;
}

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [tags, setTags] = useState<string>("");

  const OverlayTwo = () => (
    <ModalOverlay
      bg="blackAlpha.600"
      backdropFilter="auto"
      backdropBlur="10px"
    />
  );

  // useFormValidation custom hook for form validation
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormValidation(hasNameAndId(), true, true);

  // A handler for image changes
  const onImageChange = (file: File) => {
    setUploadedImage(file);
  };

  // Function to handle form submission
  const onSubmit = async (data: { name: string; message?: string }, tags: string) => {

    // Process tags
    const processedTags = tags.split('#').map(tag => tag.trim()).filter(tag => tag !== '');

  
    if (!uploadedImage) {
        return alert('Upload an image to continue');
    }

    let name = data.name;
    const currentDate = getDateInMillis();

    const user = await updateAndGetUser(name);

    let imageName = "";
    let width = 0;
    let height = 0;

    try {
        setIsLoading(true);
        // Get image dimension before upload
        const img = new Image();
        img.onload = function (event) {
          const target = event.target as HTMLImageElement;
          width = target.naturalWidth;
          height = target.naturalHeight;
        };
        img.src = URL.createObjectURL(uploadedImage);

        
        const uploadResult = await uploadImage(uploadedImage, (progress: number) => setUploadProgress(progress));
        imageName = uploadResult.name; // This will now be something like "d72fd67c-e2ed-4f2c-b0a7-67010edccafe"

    } catch (error: any) {
        setImageError(error.message)
        alert(error);
    } finally {
        setIsLoading(false);
    }

    // Create post object
    const post: Post = {
      id: uuidv4(),
      createdAt: currentDate,
      dimension: { height, width },
      userName: user.name,
      tags: processedTags, // Add tags to the post
      userId: user.id,
      image: `https://infinite-shades.imgix.net/${imageName}`,
      text: data.message,
    };

    await addPost(post);
    window.location.reload();
    onClose();
  };

  // Function to get the modal body based on the current step
  const getModalBody = () => {
    return (
        <ModalBody>
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
          <FormNameInputUI register={register} error={errors.name} />{" "}
          <FormTagsInputUI
              placeholderText="Enter tags separated by #"
              onChange={(e: any) => setTags(e.target.value)}
              value={tags}
          />

          <FormMessageInputUI
            placeholderText="Write your post (Optional)"
            register={register}
            error={errors.message}
          />
        </ModalBody>
      );
  };

  return (
    <>
      <CustomButton
        buttonText={"Create Post"}
        onClick={() => {
          onOpen();
        }}
      />
      <Modal isCentered isOpen={isOpen} size={"4xl"} onClose={onClose}>
        {OverlayTwo()}
        <ModalContent>
          <ModalHeader>
            <WelcomeTitle title="share your post" /> {/* Title */}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{getModalBody()}</ModalBody>
          <ModalFooter>
          <FormSubmitButtonUI
    onSubmit={handleSubmit(data => onSubmit(data, tags))}
    title={"Submit"}
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

export default memo(CreatePost);
