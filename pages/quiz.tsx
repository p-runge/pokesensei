import FullLayout from "@/components/FullLayout";
import { Box, Button, Paper, Typography } from "@mui/material";
import type { NextPage } from "next";

const Quiz: NextPage = () => {
  const question = "What's the type of Pikachu?";
  const answers = ["Steel", "Fire", "Electric", "Water"];

  return (
    <FullLayout>
      <Box
        display="flex"
        flexDirection="column"
        style={{
          width: "100%",
          height: "300px",
        }}
      >
        <Paper
          elevation={24}
          style={{ padding: "2rem 1rem", marginBottom: "1rem" }}
        >
          <Typography variant="h5" component="span">
            {question}
          </Typography>
        </Paper>
        <Box
          display="grid"
          gridTemplateColumns="calc(50% - .5rem) auto"
          gridRow="auto"
          style={{
            gridColumnGap: "1rem",
            gridRowGap: "1rem",
            marginBottom: "1rem",
          }}
        >
          {answers.map((answer) => (
            <Button
              key={answer}
              variant="contained"
              style={{ padding: "1rem", textTransform: "initial" }}
            >
              <Typography variant="h5" component="span">
                {answer}
              </Typography>
            </Button>
          ))}
        </Box>
      </Box>
    </FullLayout>
  );
};
export default Quiz;
