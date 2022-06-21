import { Box } from "@mui/material";

export default ({ children }: any) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      {children}
    </Box>
  );
};
