import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  navItems: { label: string; route: string }[];
}

export default ({ navItems }: Props) => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Link href="/">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            PokéSensei
          </Typography>
        </Link>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map(({ label, route }) => (
            <Link key={route} href={route}>
              <Button sx={{ color: "#fff" }}>{label}</Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
