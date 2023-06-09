import React, { useState } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
import { AiOutlineUpload } from "react-icons/ai";

interface ImageInputProps {
  onImageChange: (image: File) => void;
}

const ImageInput = ({ onImageChange }: ImageInputProps) => {
  const [error, setError] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        onImageChange(file);
        setImageName(file.name);
        setError(null);
      } else {
        setError("Please upload an image file.");
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <VStack spacing={2}>
      <Button
        onClick={handleClick}
        colorScheme="blue"
        rightIcon={<AiOutlineUpload color="white" />}
      >
        Upload Image
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {error && (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      )}
      {/* Show the image name. */}
      {imageName && <Text fontSize="sm">{imageName}</Text>}
    </VStack>
  );
};

export default ImageInput;
