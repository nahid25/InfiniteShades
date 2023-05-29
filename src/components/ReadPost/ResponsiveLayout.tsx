import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import { useAppState, Post } from "../AppStateContext";

const ResponsiveLayout = () => {
  const [{ posts }, dispatch, { fetchData }] = useAppState();
  const matchesSM = useMediaQuery("(max-width:600px)");
  const matchesMD = useMediaQuery("(min-width:600px) and (max-width:1200px)");
  const matchesLG = useMediaQuery("(min-width:1200px)");

  let cols;
  if (matchesSM) {
    cols = 1;
  } else if (matchesMD) {
    cols = 2;
  } else if (matchesLG) {
    cols = 3;
  }

  useEffect(() => {
    fetchData("posts", "SET_POSTS");
  }, []);

  return (
    <Box p={8} sx={{ width: "100%", height: "100%", overflow: "auto" }}>
      <ImageList variant="masonry" cols={cols} gap={8}>
        {Object.values(posts)
          .sort(
            (a: Post, b: Post) =>
              new Date(b.dateUpdated).getTime() -
              new Date(a.dateUpdated).getTime()
          )
          .map((post: Post, index) => (
            <ImageListItem key={index}>
              <img
                src={`${post.image}?w=500&fit=crop&auto=format`}
                srcSet={`${post.image}?w=500&fit=crop&auto=format&dpr=2 2x`}
                alt={post.text}
                loading="lazy"
              />
            </ImageListItem>
          ))}
      </ImageList>
    </Box>
  );
};

export default ResponsiveLayout;
