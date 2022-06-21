import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface Props {
  navItems: { label: string; route: string }[];
}

export default ({ navItems }: Props) => {
  const title = "PokéSensei";

  return (
    <AppBar component="nav">
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <Image
                src="/logo-50h.png"
                width={189}
                height={50}
                alt={`${title}_logo`}
                priority
              />
            </a>
          </Link>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map(({ label, route }) => (
              <Link key={route} href={route}>
                <Button sx={{ color: "#fff" }}>{label}</Button>
              </Link>
            ))}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
