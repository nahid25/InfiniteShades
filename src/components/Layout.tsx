import { Button, Grid, GridItem } from "@chakra-ui/react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import {memo, useEffect, useState} from 'react';
import { getTagsFromDatabase } from "../services/db";
import { GrFormClose } from "react-icons/gr";


interface LayoutProps {
  children: any;
  hideSidebar?: boolean;
  createCustomButton?: JSX.Element[];
  onTagSelected: (tag: string) => void; 
  selectedTag: string | null; 
}

const Layout = memo(({
  children,
  hideSidebar = false,
  createCustomButton,
  onTagSelected,
  selectedTag,
}: LayoutProps) => {

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    // Fetch tags from the database and set them
    const fetchTags = async () => {
      const fetchedTags = await getTagsFromDatabase(); 
      setTags(fetchedTags);
    };
    
    fetchTags();
  }, []);

  return (
    <Grid
    templateRows="auto 1fr auto"
    templateColumns={{ base: "1fr", lg: "15% 70% 15%" }}
    templateAreas={{
      base: `
        "nav"
        "main"
        "footer"
      `,
      lg: `
        "nav nav nav"
        "aside main aside2"
        "footer footer footer"
      `
    }}
    minH="100vh"
    gap={4}
    overflow={"hidden"}
  >
    <GridItem as="header" gridArea="nav">
      <NavBar customButton={createCustomButton} />
    </GridItem>

    {!hideSidebar && (
      <GridItem
        as="aside"
        gridArea="aside"
        p={8}
        display={{ base: "none", lg: "block" }}
      >
        {/* Content for the left sidebar */}
        {tags.map(tag => (
          <Button 
            key={tag}
            fontWeight="300"
            color={"#707070"}
            borderColor={"#9ACDFF"}
            variant={selectedTag === tag ? "solid" : "outline"}
            _hover={{ color: "#000000", borderColor: "#6495ED" }}
            size="sm"
            fontSize="12px"
            m="10px !important"
            fontFamily="Poppins, sans-serif"
            leftIcon={selectedTag === tag ? <GrFormClose /> : undefined}
            onClick={() => onTagSelected(tag)}
          >
            {tag}
          </Button>
        ))}
      </GridItem>
    )}

    <GridItem as="main" gridArea="main" minH="100vh">
      {children}
    </GridItem>

    {!hideSidebar && (
      <GridItem
        as="aside"
        gridArea="aside2"
        p={8}
        display={{ base: "none", lg: "block" }}
      >
        {/* Content for the right sidebar */}
        {/* This can be similar or different to the left sidebar content */}
      </GridItem>
    )}

    <GridItem as="footer" gridArea="footer">
      <Footer />
    </GridItem>
  </Grid>
);
});

export default Layout;