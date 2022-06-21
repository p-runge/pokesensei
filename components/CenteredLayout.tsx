import { Box, Container } from "@mui/material";

export default ({ children }: any) => {
  return (
    <Container
      component="main"
      style={{ height: "100vh", textAlign: "center" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {children}
      </Box>
    </Container>
  );
};
