import {
  Burger,
  Container,
  createStyles,
  Drawer,
  Group,
  Header,
  MediaQuery,
  Stack,
  Title,
} from "@mantine/core";
import React, { useState } from "react";

/** Defines the set of style classes that may be applied to the components
 * below.
 */
const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.dark[8],
  },

  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },

  navLink: {
    display: "block",
    borderRadius: theme.radius.sm,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
    textDecoration: "none",
    color: theme.colors.dark[1],
    padding: "0.5rem 0.75rem",
    transition: "250ms ease-in-out",
    "&:hover": {
      backgroundColor: theme.colors.cyan[8],
      color: theme.colors.dark[9],
    },
  },
}));

type NavLink = {
  name: string;
  href: string;
  target?: undefined | React.HTMLAttributeAnchorTarget;
  referrerPolicy?: undefined | React.HTMLAttributeReferrerPolicy;
};

/** Defines the links that are shown in the navbar. */
const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Search",
    href: "/search",
  },
  {
    name: "GitHub",
    href: "https://github.com/sk3p7ic/spacex-plus-one",
    target: "_blank",
    referrerPolicy: "no-referrer",
  },
];

type NavbarProps = {
  height: number;
};

export const Navbar = (props: NavbarProps) => {
  const { classes } = useStyles();
  // Controls the mobile navigation menu's state on if it is shown or not
  const [showNavigation, setShowNavigation] = useState<boolean>(false);

  return (
    <Header height={props.height} className={classes.header}>
      <Container className={classes.headerContainer}>
        <Title order={2}>SpaceX Lookup</Title>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Group spacing={5}>
            {navLinks.map((link) => (
              <a href={link.href} key={link.href} className={classes.navLink}>
                {link.name}
              </a>
            ))}
          </Group>
        </MediaQuery>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={showNavigation}
            onClick={() => setShowNavigation((show) => !show)}
            title={showNavigation ? "Close navigation" : "Open Navigation"}
          />
        </MediaQuery>
        <Drawer
          opened={showNavigation}
          onClose={() => setShowNavigation(false)}
          padding={props.height + 10}
          withCloseButton={false}
        >
          <Stack>
            {navLinks.map((link) => (
              <a
                href={link.href}
                key={link.href}
                className={classes.navLink}
                target={link?.target}
                referrerPolicy={link?.referrerPolicy}
              >
                {link.name}
              </a>
            ))}
          </Stack>
        </Drawer>
      </Container>
    </Header>
  );
};
