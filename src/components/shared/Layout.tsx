import { Grid, GridItem, Box, Button } from "@chakra-ui/react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useAppState } from "../AppStateContext";
import { useTagContext } from "../TagContext";

interface LayoutProps {
  children: any;
  hideSidebar?: boolean;
  createCustomButton?: JSX.Element[];
}

import { GrFormClose } from "react-icons/gr";

const Layout = ({
  children,
  hideSidebar = false,
  createCustomButton,
}: LayoutProps) => {
  const [state] = useAppState();
  const { posts } = state;
  const { selectedTag, setSelectedTag } = useTagContext();

  // Logic A: Collect unique tags from posts that have tags
  const tagsSet = new Set<string>();
  Object.values(posts).forEach((post) => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach((tag) => {
        tagsSet.add(tag);
      });
    }
  });
  const tags = Array.from(tagsSet);

  // Logic B: Sort tags based on occurrence count (popular to least popular)
  const tagCounts = new Map<string, number>();
  Object.values(posts).forEach((post) => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    }
  });
  const sortedTags = Array.from(tagCounts.keys()).sort(
    (tagA, tagB) => tagCounts.get(tagB)! - tagCounts.get(tagA)!
  );
  const popularTags = sortedTags.slice(0, 10);

  // Function to handle tag click
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null); // Deselect the tag if it's already selected
    } else {
      setSelectedTag(tag); // Set the selected tag if it's not already selected
    }
  };

  return (
    <Grid
      templateRows={{
        base: "auto 1fr auto",
        lg: hideSidebar ? "auto 1fr auto" : "auto 1fr auto",
      }}
      templateColumns={{ base: "1fr", lg: hideSidebar ? "1fr" : "15% 85%" }}
      templateAreas={{
        base: `"nav" "main" "footer"`,
        lg: hideSidebar
          ? `"nav" "main" "footer"`
          : `"nav nav" "aside main" "footer footer"`,
      }}
      minH="100vh"
    >
      <GridItem as="header" area="nav">
        <NavBar customButton={createCustomButton} />
      </GridItem>
      {!hideSidebar && (
        <GridItem
          as="aside"
          area="aside"
          p={8}
          display={{ base: "none", lg: "block" }}
        >
          {/* Render popular tags in the sidebar */}
          <Box>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {popularTags.map((tag) => (
                <li key={tag}>
                  {/* Use the CustomButton component here */}
                  <Button
                    fontWeight="300"
                    color={"#707070"}
                    borderColor={"#9ACDFF"}
                    variant={selectedTag === tag ? "solid" : "outline"}
                    _hover={{ color: "#000000", borderColor: "#6495ED" }}
                    size="sm"
                    fontSize="12px"
                    m="10px !important"
                    fontFamily="Poppins, sans-serif"
                    onClick={() => handleTagClick(tag)}
                    className={selectedTag === tag ? "active-tag" : ""}
                    leftIcon={selectedTag === tag ? <GrFormClose /> : undefined}
                  >
                    {tag}
                  </Button>
                </li>
              ))}
            </ul>
          </Box>
        </GridItem>
      )}
      <GridItem as="main" area="main" minH="100vh">
        {children}
      </GridItem>
      <GridItem as="footer" area="footer">
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Layout;
