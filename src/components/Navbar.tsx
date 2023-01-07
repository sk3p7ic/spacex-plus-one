import { Container, createStyles, Group, Header, Title } from "@mantine/core";

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

const navLinks = [
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
  },
];

type NavbarProps = {
  height: number;
};

export const Navbar = (props: NavbarProps) => {
  const { classes } = useStyles();

  return (
    <Header height={props.height} className={classes.header}>
      <Container className={classes.headerContainer}>
        <Title order={2}>Spacex Lookup</Title>
        <Group spacing={5}>
          {navLinks.map((link) => (
            <a href={link.href} key={link.href} className={classes.navLink}>
              {link.name}
            </a>
          ))}
        </Group>
      </Container>
    </Header>
  );
};
