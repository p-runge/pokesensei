import { Box, Container } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default ({ children }: any) => {
  return (
    <>
      <Navbar
        navItems={[
          {
            label: "Quiz",
            route: "/quiz",
          },
        ]}
      />

      {/* fixed navbar + footer spacer */}
      <Box
        style={{
          height: "100%",
          padding: "64px 0",
        }}
      >
        <Container
          component="main"
          style={{
            height: "100%",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          {children}
        </Container>
      </Box>

      <Footer navItems={[{ label: "Credits", route: "/credits" }]} />
    </>
  );
};
