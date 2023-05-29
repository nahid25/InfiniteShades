import React from "react";
import { Box } from "@chakra-ui/react";

interface PostImageProps {
  image: string | any;
  imageWidth: number | any;
  imageHeight: number | any;
}

const PostImage = ({ image, imageWidth, imageHeight }: PostImageProps) => {
  const isPortrait = imageHeight > imageWidth;
  const imageStyle = isPortrait
    ? { maxHeight: "100%", margin: "auto" }
    : { maxWidth: "100%", height: "60vh" };

  return (
    <Box
      width="100%"
      height="60vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <img
        src={
          image
            ? `${image}?auto=format,compress&q=75&w=650`
            : "https://via.placeholder.com/500"
        }
        alt="Post"
        style={imageStyle}
      />
    </Box>
  );
};

export default PostImage;
