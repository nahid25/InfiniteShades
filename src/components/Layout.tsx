import { Button, Grid, GridItem } from "@chakra-ui/react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import {memo, useEffect, useState} from 'react';
import { getTagsFromDatabase } from "../services/db";
import { TagsButton } from "./Button";


interface LayoutProps {
  children: any;
  hideSidebar?: boolean;
  createCustomButton?: JSX.Element[];
  onTagSelected: (tag: string) => void; // Add this line
}

const Layout = memo(({
  children,
  hideSidebar = false,
  createCustomButton,
  onTagSelected, // Destructure this from props
}: LayoutProps) => {

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    // Fetch tags from the database and set them
    const fetchTags = async () => {
      const fetchedTags = await getTagsFromDatabase(); // implement this function
      setTags(fetchedTags);
    };
    
    fetchTags();
  }, []);

  // Modify your onTagSelected function to update the selectedTag state
  const handleTagSelected = (tag: string) => {
    console.log(`Tag selected: ${tag}`); // Add this to debug
    setSelectedTag(prevTag => (prevTag === tag ? null : tag));
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
    {tags.map(tag => (
          <Button 
          key={tag}
          fontWeight="300"
          bg={selectedTag === tag ? "#9ACDFF" : "transparent"} // Background color changes when active
          color={selectedTag === tag ? "white" : "#707070"} // Text color changes when active
          borderColor={"#9ACDFF"}
          variant={selectedTag === tag ? "solid" : "outline"} // Variant changes based on active state
          _hover={{ bg: "#6495ED", color: "white" }} // Hover styles
          size="sm"
          fontSize="12px"
          m="10px !important"
          fontFamily="Poppins, sans-serif"
          onClick={() => onTagSelected(tag)}
        >
      {tag}
    </Button>
    ))}
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
});

export default Layout; 