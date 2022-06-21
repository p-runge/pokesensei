import { AppBar, Box, Toolbar, Divider } from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
  navItems: { label: string; route: string }[];
}

export default ({ navItems }: Props) => {
  return (
    <AppBar
      component="nav"
      position="fixed"
      style={{
        bottom: 0,
        top: "initial",
      }}
      color="transparent"
      elevation={0}
    >
      <Toolbar>
        <Box display="flex" justifyContent="end" width="100%">
          {navItems.map(({ label, route }, id) => (
            <Fragment key={route}>
              {id !== 0 && <Divider orientation="vertical" flexItem />}
              <Link href={route}>
                <span
                  style={{
                    padding: "0 1rem",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </span>
              </Link>
            </Fragment>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
