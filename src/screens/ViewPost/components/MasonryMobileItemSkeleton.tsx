import { ThemeProvider, createTheme } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { memo } from "react";

const theme = createTheme();

const MasonryMobileItemSkeleton = () => {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={1}>
        {/* Nav Bar */}
        <Skeleton
          variant="rectangular"
          sx={{ height: "80px", width: "100%" }}
        />

        {/* PostImage Skeleton */}
        <Skeleton variant="rounded" sx={{ height: "450px", width: "100%" }} />

        {/* PostMobileStats Skeleton */}
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />

        {/* PostMobileGuide Skeleton */}
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} />

        {/* PostMobileComment Skeleton */}
        <Skeleton
          variant="rectangular"
          sx={{ height: "50px", width: "100%" }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default memo(MasonryMobileItemSkeleton);
