import { Box, Container } from "@mui/material";

export default ({ children }: any) => {
  return (
    <Container
      component="main"
      style={{
        height: "calc(100vh - 128px)",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        {children}
      </Box>
    </Container>
  );
};
