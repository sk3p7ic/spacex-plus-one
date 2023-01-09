import { Button, Container, createStyles, Input, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  page: {
    paddingLeft: `${theme.spacing.sm}px`,
    paddingRight: `${theme.spacing.sm}px`,
  },

  searchForm: {
    display: "flex",
    flexDirection: "column",
    gap: `${theme.spacing.sm}px`,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "row",
      justifyContent: "center",
    },
  },
}));

export const SearchPage = () => {
  const { classes } = useStyles();

  return (
    <main className={classes.page}>
      <Container>
        <Title ta="center">Search</Title>
        <div className={classes.searchForm}>
          <Input variant="filled" placeholder="Enter mission name." />
          <Button>Search</Button>
        </div>
      </Container>
    </main>
  );
};
