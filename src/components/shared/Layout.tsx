import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "./Footer";
import NavBar from "./NavBar";

interface LayoutProps {
  children: any;
  hideSidebar?: boolean;
  createCustomButton?: JSX.Element[];
}

const Layout = ({
  children,
  hideSidebar = false,
  createCustomButton,
}: LayoutProps) => {
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
          bg="gray.600"
          p={8}
          display={{ base: "none", lg: "block" }}
        ></GridItem>
      )}
      <GridItem as="main" area="main" minH="100vh">
        {children} {/* Render the child components here */}
      </GridItem>
      <GridItem as="footer" area="footer">
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Layout;
